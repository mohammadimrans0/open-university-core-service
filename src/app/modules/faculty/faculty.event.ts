import { RedisClient } from '../../../shared/redis'
import { EVENT_FACULTY_CREATED, EVENT_FACULTY_UPDATED } from './faculty.constant'
import { FacultyService } from './faculty.service'

const initFacultyEvents = () => {
  RedisClient.subscribe(EVENT_FACULTY_CREATED, async (e: string) => {
    const data = JSON.parse(e)
    await FacultyService.createFacultyFromEvent(data)
  })

  RedisClient.subscribe(EVENT_FACULTY_UPDATED, async (e: string) => {
    const data = JSON.parse(e)

    await FacultyService.updateFacultyFromEvent(data)
  })
}

export default initFacultyEvents
