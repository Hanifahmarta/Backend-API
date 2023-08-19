import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import streamlit as st
from babel.numbers import format_currency

# Sidebar
st.sidebar.title('Bike Sharing Dashboard')
selected_dataset = st.sidebar.selectbox('Select Dataset', ('Hourly', 'Daily'))

# Main content based on selected dataset
st.title('Bike Sharing Analysis')

if selected_dataset == 'Hourly':
    st.header('Hourly Dataset')
    st.write(hourly_data.head())
    
    # Question 1: Jumlah peminjaman sepeda dalam sehari
    st.subheader('Jumlah Peminjaman Sepeda dalam Sehari')
    total_rentals_per_day = hourly_data.groupby('dteday')['cnt'].sum()
    st.line_chart(total_rentals_per_day)
    
    # Question 2: Distribusi peminjaman sepeda berdasarkan hari dalam seminggu
    st.subheader('Distribusi Peminjaman Sepeda Berdasarkan Hari dalam Seminggu')
    daily_data['day_of_week'] = pd.Categorical(daily_data['weekday'], categories=[0, 1, 2, 3, 4, 5, 6], ordered=True)
    rentals_per_day_of_week = daily_data.groupby('day_of_week')['cnt'].mean()
    
    day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    rentals_per_day_of_week.index = day_names
    
    st.bar_chart(rentals_per_day_of_week)

else:
    st.header('Daily Dataset')
    st.write(daily_data.head())
    
    # Question 1: Jumlah peminjaman sepeda dalam sehari
    st.subheader('Jumlah Peminjaman Sepeda dalam Sehari')
    total_rentals_per_day = daily_data.groupby('dteday')['cnt'].sum()
    st.line_chart(total_rentals_per_day)
    
    # Question 2: Distribusi peminjaman sepeda berdasarkan hari dalam seminggu
    st.subheader('Distribusi Peminjaman Sepeda Berdasarkan Hari dalam Seminggu')
    daily_data['day_of_week'] = pd.Categorical(daily_data['weekday'], categories=[0, 1, 2, 3, 4, 5, 6], ordered=True)
    rentals_per_day_of_week = daily_data.groupby('day_of_week')['cnt'].mean()
    
    day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    rentals_per_day_of_week.index = day_names
    
    st.bar_chart(rentals_per_day_of_week)

    st.pyplot(fig)
