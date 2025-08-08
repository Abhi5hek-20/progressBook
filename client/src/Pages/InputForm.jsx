import React, { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { workoutLogThunk } from '../store/workout/workoutThunk'
import { recentWorkoutsUpdate } from '../store/workout/workoutSlice'
const initialData = {
    workoutname: "",
    date: "",
    exercisename: "",
    sets: "",
    reps: "",
    max_weight: "",
}

const InputForm = () => {
  const dispatch = useDispatch()
  const [workoutData, setWorkoutData] = useState(initialData);

  const handleChange = (e) => {
    setWorkoutData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleWorkoutDataSubmit = async (e) => {
    e.preventDefault();
    await dispatch(workoutLogThunk(workoutData));
    await dispatch(recentWorkoutsUpdate(workoutData))
    setWorkoutData(initialData)
  }

  return (
    <div className="w-full">
      <form className="space-y-6" onSubmit={handleWorkoutDataSubmit}>
        {/* Workout Session Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Session Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Workout Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="workoutname"
                value={workoutData.workoutname}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                placeholder="e.g., Push Day, Leg Day"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Date
              </label>
              <input
                onChange={handleChange}
                type="date"
                name="date"
                value={workoutData.date}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                required
              />
            </div>
          </div>
        </div>

        {/* Exercise Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Exercise Information</h3>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Exercise Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="exercisename"
              value={workoutData.exercisename}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
              placeholder="e.g., Bench Press, Squats, Deadlift"
              required
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Sets
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  type="number"
                  name="sets"
                  value={workoutData.sets}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                  min="1"
                  placeholder="4"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 text-sm">sets</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Reps
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  type="number"
                  name="reps"
                  value={workoutData.reps}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                  min="1"
                  placeholder="10"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 text-sm">reps</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Weight
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  type="number"
                  name="max_weight"
                  value={workoutData.max_weight}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200"
                  min="0"
                  step="0.5"
                  placeholder="80"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 text-sm">kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Log Workout
          </button>
        </div>
      </form>
    </div>
  )
}

export default InputForm
