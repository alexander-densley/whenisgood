'use client'
import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import Schedule from '@/components/schedule'

export default function CreateEvent() {
	const today = new Date()
	const nextWeek = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 7
	)
	const [startDate, setStartDate] = React.useState<Date | undefined>(today)
	const [endDate, setEndDate] = React.useState<Date | undefined>(nextWeek)
	const disabledDays = [{ from: new Date(1999, 4, 18), to: startDate }]
	const [startOpen, setStartOpen] = React.useState(false)
	const [endOpen, setEndOpen] = React.useState(false)
	const [duration, setDuration] = React.useState<
		| '15 min'
		| '30 min'
		| '45 min'
		| '1 hour'
		| '2 hours'
		| '3 hours'
		| '1 day'
		| undefined
	>()

	function handleStartDateChange(date: Date | undefined) {
		setStartDate(date)
		setStartOpen(false)
	}

	function handleEndDateChange(date: Date | undefined) {
		setEndDate(date)
		setEndOpen(false)
	}

	return (
		<div className='min-h-screen flex flex-col items-center'>
			<h1 className='text-center text-5xl mt-24 font-bold'>Create Event</h1>
			<p className='text-center text-2xl '>Create a new event.</p>
			<div className='flex flex-col space-y-1.5 mt-8'>
				<Popover open={startOpen} onOpenChange={setStartOpen}>
					<Label>Start Date</Label>
					<PopoverTrigger id='startDate' asChild>
						<Button
							variant={'outline'}
							className={cn(
								'w-[280px] justify-start text-left font-normal',
								!startDate && 'text-muted-foreground'
							)}
						>
							<CalendarIcon className='mr-2 h-4 w-4' />
							{startDate ? (
								format(startDate, 'PPP')
							) : (
								<span>Pick a start date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0'>
						<Calendar
							mode='single'
							selected={startDate}
							onSelect={(date) => handleStartDateChange(date)}
							defaultMonth={startDate}
							initialFocus
						/>
					</PopoverContent>
				</Popover>

				<Popover open={endOpen} onOpenChange={setEndOpen}>
					<Label htmlFor='endDate'>End Date</Label>
					<PopoverTrigger id='endDate' asChild>
						<Button
							variant={'outline'}
							className={cn(
								'w-[280px] justify-start text-left font-normal',
								!endDate && 'text-muted-foreground'
							)}
						>
							<CalendarIcon className='mr-2 h-4 w-4' />
							{endDate ? format(endDate, 'PPP') : <span>Pick an end date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0'>
						<Calendar
							mode='single'
							selected={endDate}
							onSelect={(date) => handleEndDateChange(date)}
							initialFocus
							disabled={disabledDays}
							defaultMonth={endDate}
						/>
					</PopoverContent>
				</Popover>

				<Select defaultValue={duration} onValueChange={setDuration}>
					<Label htmlFor='duration'>Duration</Label>
					<SelectTrigger id='duration' className='w-[280px]'>
						<SelectValue placeholder='Select a duration' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='15 min'>15 min</SelectItem>
							<SelectItem value='30 min'>30 min</SelectItem>
							<SelectItem value='45 min'>45 min</SelectItem>
							<SelectItem value='1 hour'>1 hour</SelectItem>
							<SelectItem value='2 hours'>2 hours</SelectItem>
							<SelectItem value='3 hours'>3 hours</SelectItem>
							<SelectItem value='1 day'>1 day</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<Schedule startDate={startDate} endDate={endDate} duration={duration} />
		</div>
	)
}
