import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
	return (
		<div className='min-h-screen flex flex-col items-center'>
			<h1 className='text-center text-5xl mt-24 font-bold'>When is Good</h1>
			<p className='text-center text-2xl '>
				The modern way to schedule a time to meet.
			</p>
			<Link href='/create-event'>
				<Button>Get Started</Button>
			</Link>
		</div>
	)
}
