import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const EVENTDATA = [
  {
    title: '2025-10-01',
    data: [
      {hour: '12am', duration: '1h', title: 'Holi'},
    ],
  },
  {
    title: '2025-10-15',
    data: [
      {hour: '9am', duration: '1h', title: 'Republic Day'}
    ],
  },
  {
    title: '2025-10-20',
    data: [
      {hour: '9am', duration: '1h', title: 'Diwali'}
    ],
  },
];

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HinduCalendar = () => {
  const [selected, setSelected] = useState('');

  return (
    <View>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          '2025-10-20': {marked: true, dotColor: '#f3ca13ff'},
          [selected]: {selected: true, disableTouchEvent: true, selectedColor: '#f3ca13ff'}
        }}
        theme={{
          backgroundColor: '#ffffff', // Overall background color
          calendarBackground: '#ffffff', // Calendar background color
          textSectionTitleColor: '#b6c1cd', // Color for section titles (weekdays)
          selectedDayBackgroundColor: '#00adf5', // Background color for selected day
          selectedDayTextColor: '#ffffff', // Text color for selected day
          todayTextColor: '#f3ca13ff', // Text color for today's date
          dayTextColor: '#2d4150', // Default day text color
          textDisabledColor: '#d9e1e8', // Color for disabled days
          dotColor: '#f3ca13ff', // Default dot color
          selectedDotColor: '#f3ca13ff', // Dot color for selected day
          arrowColor: '#f3ca13ff', // Color for navigation arrows
          monthTextColor: '#f3ca13ff', // Color for month text
          indicatorColor: 'yellow', // Color for loading indicator
          textDayFontFamily: 'monospace', // Font family for day numbers
          textMonthFontFamily: 'monospace', // Font family for month text
          textDayHeaderFontFamily: 'monospace', // Font family for day headers
          textDayFontSize: 16, // Font size for day numbers
          textMonthFontSize: 16, // Font size for month text
          textDayHeaderFontSize: 16 // Font size for day headers
        }}
      />
    </View>
  );
};

type FestivalProps = {
  name: string;
};

const Festival = (props: FestivalProps) => {
  return (
    <View style={styles.center}>
      <Text>Today is {props.name}</Text>
    </View>
  )
}

const FestivalInfo = () => {
  return (
    <View style={styles.flexCenter}>
      <Festival name='Diwali' />
      <Festival name='Holi' />
      <Festival name='Republic Day' />
    </View>
  );
};

const App = () => {
  return (
    <View>
      <HinduCalendar />
      <FestivalInfo />
    </View>
  );
}

export default App;
