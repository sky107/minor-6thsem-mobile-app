import React from 'react';
import { View, Text, Modal, Dimensions, Image, Pressable } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const { height, width } = Dimensions.get('window');
export default function CalendarModal(props) {
  const [v, setVisisble] = React.useState(true);
  const [marked, setMarked] = React.useState(null);
  return (
    <Modal transparent visible={v}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>

        <View style={{ backgroundColor: 'white', marginTop: height / 3, marginHorizontal: 30, flexDirection: 'row', borderRadius: 10 }}>

          <Calendar
            // Initially visible month. Default = now
            // current={'2022-05-10'}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // minDate={'2022-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2022-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              console.log('selected day', day);
              // setVisisble(v => !v);
              // setMarked()
            }}

            markedDates={{
              '2022-04-07': { selected: true, selectedColor: 'dodgerblue' }
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log('selected day', day);

            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={direction => <Arrow />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={true}
            // Show week numbers to the left. Default = false
            // showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter
            renderHeader={date => <Text>{date.toString()}</Text>}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
            style={{
              width: width - 600,
              borderRadius: 12,
              backgroundColor: '#eee',
              padding: 5
            }}
          />


        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>



          <Pressable onPress={() => {

            setVisisble(false)
          }}>
            <Image
              source={require('../assets/cancelIcon.png')}
              style={{
                height: 45,
                width: 45,
                margin: 10
              }}
            />
          </Pressable>

        </View>

      </View>
    </Modal >
  );
}
