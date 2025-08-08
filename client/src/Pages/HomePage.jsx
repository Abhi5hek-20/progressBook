import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InputForm from './InputForm'
import WorkoutChart from './WorkoutChart'
import {Link} from 'react-router-dom'

const HomePage = () => {
  const { userProfile } = useSelector(state => state.userReducer)
  const {exercisesDid,recentWorkouts,totalSessions} = useSelector(state => state.workoutReducer) 
  
  return (
      <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <div className="relative px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Welcome back, <span className="text-emerald-400">{userProfile?.username}</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Track your fitness journey with precision and style. 
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Total Sessions Card */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{totalSessions}</h3>
                <p className="text-gray-300">Total Sessions</p>
              </div>

              {/* Exercises Card */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{exercisesDid?.length || 0}</h3>
                <p className="text-gray-300">Unique Exercises</p>
              </div>

              {/* Recent Activity Card */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{recentWorkouts?.length || 0}</h3>
                <p className="text-gray-300">Recent Workouts</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Add Workout Section */}
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    Add New Workout
                  </h2>
                  <InputForm />
                </div>
              </div>

              {/* Analytics Section */}
              <div className="space-y-8">
                {/* Workout Chart */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    Progress Analytics
                  </h2>
                  <WorkoutChart />
                </div>

                {/* Recent Workouts */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      Recent Activity
                    </h2>
                    <Link
                      to='/workout-history'
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      View All
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  
                  {recentWorkouts && recentWorkouts.length > 0 ? (
                    <div className="space-y-3">
                      {recentWorkouts.map((workout, index) => (
                        <div
                          key={workout._id || index}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {(workout.Workoutname || workout.workoutname || 'W').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-white font-medium">
                                {workout.Workoutname || workout.workoutname}
                              </h3>
                              <p className="text-gray-400 text-sm">
                                {workout.Exercise_name}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-300 text-sm">
                              {new Date(workout.workout_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                            <p className="text-emerald-400 text-xs">
                              {workout.t_sets}×{workout.reps} @ {workout.weight}kg
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-gray-400">No recent workouts</p>
                      <p className="text-gray-500 text-sm">Start by adding your first workout</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
