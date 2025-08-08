import mongoose from 'mongoose';

// Workout Schema based on SQL workoutData table
const workoutSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  user_id: {
    type: String,
    required: [true, 'User ID is required'],
    ref: 'User' // Reference to User model for population
  },
  Workoutname: {
    type: String,
    required: [true, 'Workout name is required'],
    trim: true,
    maxlength: [100, 'Workout name cannot exceed 100 characters']
  },
  workout_date: {
    type: Date,
    required: [true, 'Workout date is required'],
    default: Date.now
  },
  Exercise_name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true,
    maxlength: [200, 'Exercise name cannot exceed 200 characters']
  },
  t_sets: {
    type: Number,
    required: [true, 'Number of sets is required'],
    min: [1, 'Sets must be at least 1'],
    validate: {
      validator: Number.isInteger,
      message: 'Sets must be a whole number'
    }
  },
  reps: {
    type: Number,
    required: [true, 'Number of reps is required'],
    min: [1, 'Reps must be at least 1'],
    validate: {
      validator: Number.isInteger,
      message: 'Reps must be a whole number'
    }
  },
  weight: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Weight cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: 'Weight must be a whole number'
    }
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  versionKey: false // Removes __v field
});

// Compound indexes for better query performance
workoutSchema.index({ user_id: 1, workout_date: -1 }); // For user's workouts by date
workoutSchema.index({ user_id: 1, Workoutname: 1 }); // For user's workouts by name
workoutSchema.index({ workout_date: -1 }); // For date-based queries

// Virtual for total volume (sets × reps × weight)
workoutSchema.virtual('totalVolume').get(function() {
  return this.t_sets * this.reps * this.weight;
});

// Static method to find workouts by user
workoutSchema.statics.findByUserId = function(userId) {
  return this.find({ user_id: userId }).sort({ workout_date: -1 });
};

// Static method to find workouts by date range
workoutSchema.statics.findByDateRange = function(userId, startDate, endDate) {
  return this.find({
    user_id: userId,
    workout_date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  }).sort({ workout_date: -1 });
};

// Static method to find workouts by exercise name
workoutSchema.statics.findByExercise = function(userId, exerciseName) {
  return this.find({
    user_id: userId,
    Exercise_name: { $regex: exerciseName, $options: 'i' }
  }).sort({ workout_date: -1 });
};

// Method to get workout summary
workoutSchema.methods.getSummary = function() {
  return {
    id: this._id,
    workout: this.Workoutname,
    exercise: this.Exercise_name,
    date: this.workout_date,
    totalVolume: this.totalVolume,
    sets: this.t_sets,
    reps: this.reps,
    weight: this.weight
  };
};

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
