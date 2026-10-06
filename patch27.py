book_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\BookAppointmentScreen.tsx'
with open(book_path, 'r', encoding='utf-8') as f:
    book_content = f.read()

book_content = book_content.replace(
'''            navigation.replace('MainTabs', { screen: 'Appointments' });''',
'''            navigation.goBack();''')

with open(book_path, 'w', encoding='utf-8') as f:
    f.write(book_content)
