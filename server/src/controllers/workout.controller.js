import {
  toPascalCase,
  editDate,
} from "./utils/extraFunctions.util.js";
import User from "../models/userdb.js";
import Workout from "../models/workout.js";
import { v4 as uuidv4 } from "uuid";

export const getData = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    
    // Debug: Check what workouts exist
    const allWorkouts = await Workout.find({ user_id: userId });
    console.log('All user workouts:', allWorkouts.length);
    console.log('Sample workout:', allWorkouts[0]);

    // Get total unique workout dates (sessions)
    const totalSessionsResult = await Workout.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: "$workout_date" } },
      { $count: "total_sessions" }
    ]);
    const t_sessions = totalSessionsResult[0]?.total_sessions || 0;

    // Get recent 3 workouts
    const recentWorkouts = await Workout.find({ user_id: userId })
      .sort({ workout_date: -1, Workoutname: -1 })
      .limit(3);

    // Get distinct exercise names
    const exercisesDid = await Workout.distinct('Exercise_name', { user_id: userId });
    
    // Debug: Log the exercises
    console.log('Backend - userId:', userId);
    console.log('Backend - exercisesDid:', exercisesDid);
    console.log('Backend - exercisesDid length:', exercisesDid.length);

    return res.status(200).json({
      success: true,
      homePageData: {
        t_sessions,
        recentWorkouts,
        exercisesDid: exercisesDid.map(name => ({ Exercise_name: name })),
      }
    });
  } catch (err) {
    console.error("Error in workout.controller - getData:", err);
    res.status(500)
    .json({
        message: "Internal Server Error.!",
        success: false,
    });
  }
};

export const getHistory = async (req, res) => {
  const { _id: userId } = req.user;
  
  try {
    const workoutHistory = await Workout.find({ user_id: userId })
      .sort({ workout_date: -1 });

    if (workoutHistory.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No workout History.!",
        data: [],
      });
    } else {
      return res.status(200).json({
        success: true,
        workoutHistory,
      });
    }
  } catch (error) {
    console.log("Error in workout.controller - getHistory: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

export const insertData = async (req, res) => {
  let { workoutname, date, exercisename, reps, sets, max_weight } = req.body;
  const { _id: userId } = req.user;

  try {
    if (
      !workoutname ||
      !date ||
      !exercisename ||
      !reps ||
      !sets ||
      !max_weight
    ) {
      return res.status(400).json({
        message: "please provide all fields..!",
        success: false,
      });
    }

    const rowId = uuidv4();
    exercisename = toPascalCase(exercisename);

    console.log('Saving workout with userId:', userId);
    console.log('Exercise name:', exercisename);

    const newWorkout = new Workout({
      _id: rowId,
      user_id: userId,
      Workoutname: workoutname,
      workout_date: new Date(date),
      Exercise_name: exercisename,
      t_sets: sets,
      reps: reps,
      weight: max_weight
    });

    await newWorkout.save();

    return res.status(201).json({
      message: "successfully exercise added..!",
      success: true,
    });
  } catch (error) {
    console.log("Error in workout.controller - insertData: ", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const editData = async (req, res) => {
  let { Workoutname, Exercise_name, t_sets, reps, _id, weight } = req.body;

  try {
    if (
      !Workoutname ||
      !Exercise_name ||
      !reps ||
      !t_sets ||
      !weight
    ) {
      return res.status(400).json({
        message: "please provide all fields..!",
        success: false,
      });
    }

    Exercise_name = toPascalCase(Exercise_name);

    await Workout.findByIdAndUpdate(_id, {
      Workoutname,
      Exercise_name,
      t_sets,
      reps,
      weight
    });

    return res.status(201).json({
      success: true,
      message: "SuccessFully Edited.!",
    });
  } catch (error) {
    console.log("Error in workout.controller => editData", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deleteSingleRow = async (req, res) => {
  let { _id } = req.params;

  try {
    await Workout.findByIdAndDelete(_id);
    
    res.status(200).json({
      success: true,
      message: "successfully Deleted..!",
    });
  } catch (error) {
    console.log("Error in workout.controller - deleteSingleRow:", error);
    res.status(500).json({
      message: "Internal server Error",
      success: false,
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    await Workout.deleteMany({ user_id: userId });

    return res.status(200).json({
      message: "SuccessFully All data deleted..!",
      success: true,
    });
  } catch (error) {
    console.log("Error in workout.controller - deleteAll", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getDataForChart = async (req, res) => {
  const { _id: userId } = req.user;
  const { Exercise } = req.params;
  
  if (!Exercise) {
    return res.status(400).json({
      message: "No exercise selected.!",
      success: false,
    });
  }
  
  try {
    const result = await Workout.find({
      user_id: userId,
      Exercise_name: Exercise
    })
    .select('workout_date weight reps')
    .sort({ workout_date: -1 })
    .limit(10);

    if (result) {
      let chartData = editDate(result);
      res.status(200).json({
        chartData: result,
        message: "SuccessFully fetched",
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in workout.controller - getDataForChart:", error);
    res.status(500).json({
      message: "Internal Server Error..!",
      success: false
    });
  }
};
