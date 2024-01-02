import { startOfYear,startOfDay,startOfMonth, startOfYesterday, startOfWeekYear, subMonths, eachWeekOfInterval,eachDayOfInterval,eachMonthOfInterval} from "date-fns";

const timeInterval = 'week'
  let startDate = subMonths(startOfYear(Date()),3);
  let interval;

  switch (timeInterval){
    case "day":
      interval = eachDayOfInterval({start:startDate, end:Date()})
      break;
    
    case "week":
      interval = eachWeekOfInterval({start:startDate, end:Date()})
      break;

    case "month":
      interval = eachMonthOfInterval({start:startDate, end:Date()})
      break;

    default:
      console.log("Invalid interval");

  }
  console.log("Start: ", startDate);
  console.log("End:", Date());
  console.log("Interval: ",interval);