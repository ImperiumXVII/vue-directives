export class CET extends Date {
    constructor(date?: Date) {
        super(date || new Date());
        const CETformatting = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Europe/Bratislava',
        })
            .format(this)
            .replace(', ', 'T')
            .replace(/\//g, '-');
        const dateTime = CETformatting.split('T');
        const dates = dateTime[0].split('-');
        return new Date(`${dates[2]}-${dates[1]}-${dates[0]}T${dateTime[1]}`);
    }
};

export default CET