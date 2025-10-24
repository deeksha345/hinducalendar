import React, { useCallback, useState } from 'react';
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { AgendaList, CalendarProvider, DateData, ExpandableCalendar } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

export interface AgendaItem {
  hour: string;
  duration: string;
  title: string;
}

export interface AgendaSection {
  title: string; //YY-MM-DD
  data: AgendaItem[];
}

const EVENTDATA: AgendaSection[] = [
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
  {
    title: '2025-10-23',
    data: [
      {hour: '9am', duration: '1h', title: 'Navratri'}
    ],
  },
];

const ExpandableCalendarScreen = () => {
  const [items, setItems] = useState<AgendaSection[]>(EVENTDATA);

  // get marked dates
  const marked: MarkedDates = items.reduce<MarkedDates>((acc, section) => {
    acc[section.title] = {marked: true};
    return acc;
  }, {});

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<AgendaItem>) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    ), []
  );

  const onDateChanged = (date: string, source: string) => {
    console.log('Date changed:', date, source);
  };

  const onMonthChange = (month: DateData) => {
    console.log('Month changed:', month);
  };

  return (
    <CalendarProvider
      date={'2025-10-23'}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      theme={{todayButtonTextColor: '#00adf5'}}>
      <ExpandableCalendar
        markedDates={marked}
        firstDay={1}
      />
      <AgendaList
        sections={items}
        renderItem={renderItem}
        sectionStyle={styles.section}
      />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginRight: 10,
    marginTop: 17,
    borderRadius: 5,
  },
  itemHour: {
    fontSize: 12,
    color: '#555',
  },
  itemTitle: {
    fontSize: 16,
    color: '#222',
  },
  section: {
    backgroundColor: '#f2f2f2',
    color: '#333',
    fontWeight: 'bold',
  },
});

export default ExpandableCalendarScreen;
