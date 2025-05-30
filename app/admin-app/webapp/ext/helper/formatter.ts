export default {
    toDateObject: function (sDate: string): Date | null {
      return sDate ? new Date(sDate) : null;
    }
};