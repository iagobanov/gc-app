class DateHandler {
  public static isValid (date: string): boolean {
    const pattern = new RegExp(/^(\d{4})-(\d{2})-(\d{2})$/)
    return pattern.test(date)
  }
}

class DatetimeHandler {
  public static isValid (datetime: string): boolean {
    const pattern = new RegExp(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\+(\d{2}):(\d{2})$/)
    return pattern.test(datetime)
  }
}

export { DateHandler, DatetimeHandler }
