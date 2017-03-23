module.exports = function errorsProcessor (calendar) {
  if (calendar.error) {
    const err = new Error(calendar.error.message)
    err.code = calendar.error.code
    err.errors = calendar.error.errors
    throw err
  }
  return calendar
}
