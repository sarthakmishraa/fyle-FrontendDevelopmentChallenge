export interface workoutType {
    type: string,
    minutes: number
}
  
export interface usersType {
    id: number | null,
    name: string,
    workouts: workoutType[]
}