import initFacultyEvents from "../modules/faculty/faculty.event"
import initStudentEvents from "../modules/student/student.event"

const subscribeToEvents = () => {
  initStudentEvents()
  initFacultyEvents()
}

export default subscribeToEvents
