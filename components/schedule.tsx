interface ScheduleProps {
	startDate?: Date
	endDate?: Date
	duration?:
		| '15 min'
		| '30 min'
		| '45 min'
		| '1 hour'
		| '2 hours'
		| '3 hours'
		| '1 day'
}
export default function Schedule({
	startDate,
	endDate,
	duration,
}: ScheduleProps) {
	if (!duration || !startDate || !endDate) {
		return <div>not set</div>
	}
	const daysBetween = Math.ceil(
		(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
	)

	return <div>{daysBetween} days</div>
}
