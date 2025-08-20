const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const { name, className, section, roll } = req.query;
  const filterPayload = { name, className, section, roll };

  const students = await getAllStudents(filterPayload);
  res.status(200).json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const payload = req.body;

  const result = await addNewStudent(payload);
  res.status(201).json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const payload = req.body;

  payload.id = id;

  const result = await updateStudent(payload);
  res.status(200).json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const student = await getStudentDetail(id);
  res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { reviewerId, status } = req.body;

  const result = await setStudentStatus({ userId, reviewerId, status });
  res.status(200).json(result);
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};
