import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pandas as pd
from geopy import distance
import datetime
import tkinter as tk
from tkinter import messagebox

def read_data(db, collection_name, expected_columns):
    ref = db.collection(collection_name)
    docs = ref.get()

    data = {}
    index = []
    for doc in docs:
        index.append(doc.id)
        doc_dict = doc.to_dict()
        for ec in expected_columns:
            if ec in doc_dict.keys():
                continue
            else:
                doc_dict[ec] = None

        for i in doc_dict:
            if i in data.keys():
                data[i].append(doc_dict[i])
            else:
                data[i] = [doc_dict[i]]

    df = pd.DataFrame(data, columns=expected_columns, index=index)
    df.dropna()
    return df

class App:
    def __init__(self, master):
        self.master = master
        self.master.geometry("400x200")
        master.title("Recommender")

        self.label = tk.Label(master, text="Generate the recommendations for our users:")
        self.label.pack()

        self.button = tk.Button(master, text="Start", height=2, width=10, command=self.run_program)
        self.button.pack(pady=50, padx=(master.winfo_width() - 100) // 2)

    def run_program(self):
        try:
            cred = credentials.Certificate('iungo-8f30b-firebase-adminsdk-7obwd-898d3a1aee.json')
            firebase_admin.initialize_app(cred)

            db = firestore.client()

            expected_columns1 = ['toCoordinates', 'roundTrip', 'seatsTaken', 'returnDate', 'seatsMax', 'type', 'date',
                                 'from', 'to', 'riders', 'sameGender', 'fromCoordinates']
            expected_columns2 = ['numOfRatings', 'lastName', 'firstName', 'comments', 'rating', 'pastTrips', 'gender',
                                 'upcomingTrips', 'coordinates', 'email']

            # Read data from the database
            df_trips = read_data(db, u'trips', expected_columns1)
            df_users = read_data(db, u'users', expected_columns2)

            total_rec = {}
            for index, row in df_users.iterrows():
                user_coord = row['coordinates']
                trips_coord = df_trips['fromCoordinates']
                dis = []
                for i in range(len(trips_coord)):
                    dis.append(distance.distance(user_coord, trips_coord[i]).km)
                df_trips['dis_users_trips'] = dis

                now = datetime.datetime.now()
                delta_time = []
                for time in df_trips['date']:
                    dt_seconds = (datetime.datetime.fromtimestamp(time) - now).total_seconds()
                    if dt_seconds < 0:
                        dt_seconds = 1e9
                    delta_time.append(dt_seconds)

                df_trips['delta_time'] = delta_time

                df_trips['sort_value'] = df_trips['dis_users_trips'] * 1e4 + df_trips['delta_time']

                df_sorted = df_trips.sort_values('sort_value', ascending=True).head(5)

                df_sorted.drop(['dis_users_trips', 'delta_time', 'sort_value'], axis=1, inplace=True)
                #print(df_sorted)
                rec = df_sorted.index.tolist()
                total_rec[index] = rec
            # Write data to the database
            rec_ref = db.collection(u'recommendations').document('test')
            rec_ref.set(total_rec)

            messagebox.showinfo("Program Complete", "The program has finished running!")
        except Exception as e:
            messagebox.showerror("Error", str(e))

root = tk.Tk()
app = App(root)
root.mainloop()
