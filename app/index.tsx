import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

/*
TO DO

Add Navigation
https://reactnative.dev/docs/navigation
1. Update festival card component to add "More Info..." link
2. Route to more info, and render information about that specific festival

Organize the code
https://dev.to/paulocappa/how-to-organize-your-components-in-react-native-folder-structure-and-project-organization-1hke

Gregorian Cal Date to panchāngam Hindu Cal Date Conversion
https://en.wikipedia.org/wiki/Panchangam
https://github.com/schenna/panchangJS

Set up Database
*/

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

type FestivalItem = {
  date: string; //YY-MM-DD
  name: string;
  description: string;
}

type FestivalProps = {
  name: string;
};

const EVENTDATA: FestivalItem[] = [
  {
    date: '2025-10-01',
    name: 'Holi', 
    description: 'The festival of color'
  },
  {
    date: '2025-10-15',
    name: 'Republic Day', 
    description: 'Independence day'
  },
  {
    date: '2025-10-20',
    name: 'Diwali', 
    description: 'The festival of light'
  },
];

const FestivalCard = (props: FestivalProps) => {
  return (
    <View
      style={{
        padding: 20,
        margin: 100,
        height: 100,
        width: 500,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#2a89d1ff',
      }}
    >
      <Text>Today is {props.name}</Text>

    </View>
  );
};

const HinduCalendar = () => {
  const [selected, setSelected] = useState('');
  const [festival, setFestival] = useState('');

  const markedDates = EVENTDATA.reduce((acc, event) => {
    acc[event.date] = { marked: true, dotColor: '#f3ca13ff', selected: false };
    return acc;
  }, {} as { [key: string]: any});

  const combinedMarkedDates = {
    ...markedDates,
    [selected]: {selected: true, disableTouchEvent: true, selectedColor: '#f3ca13ff'},
  };

  const handleDayPress = (day: { dateString: string}) => {
    // set date as selected
    setSelected(day.dateString);

    // show event date if date is corresponding to an event
    const event = EVENTDATA.find((e) => e.date === day.dateString);
    setFestival(event? event.name : '');
  };

  const calendarTheme = {
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
  }

  return (
    <View style={{flexDirection: 'column-reverse', justifyContent: 'space-evenly', backgroundColor: '#2d4150'}}>
      <Calendar
        // hideArrows={true}
        onDayPress={handleDayPress}
        markedDates={combinedMarkedDates}
        theme={calendarTheme}
      />

      {festival && <FestivalCard name={festival}/>}
    </View>
  ); 
};

const App = () => {
  return (
    <View >
      <HinduCalendar />
    </View>
  );
}

export default App;
