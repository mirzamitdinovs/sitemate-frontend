'use client';
import Table from '@/components/Table'; // Adjust the import path as needed
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Issue } from '@/types/Issue';
import { Edit2, Eye, File, PlusCircle, Trash2 } from 'lucide-react';
import useSWR, { mutate } from 'swr';
import IssueModal from './IssueModal';
import { useRef } from 'react';

interface iProps {
	fetcher: () => Promise<Issue[]>;
}
interface IssueModalHandle {
	open: (item: Issue | null) => void;
}
const IssuesWrapper = ({ fetcher }: iProps) => {
	const issueModalRef = useRef<IssueModalHandle>(null);
	const { data: issues, error, isLoading } = useSWR('api/issues', fetcher);

	const tableHeaders = ['ID', 'Title', 'Description', 'Created At', 'Actions'];

	const handleEdit = (issueId: number) => {
		// Implement edit functionality
		console.log('Edit issue:', issueId);
	};

	const handleDelete = async (issueId: number) => {
		// Implement delete functionality
		try {
			const res = await fetch(`http://localhost:4000/api/issues/${issueId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			mutate('api/issues');
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<div className='mt-10'>
			<div className='flex items-center'>
				<div className='ml-auto flex items-center gap-2'>
					<Button size='sm' variant='outline' className='h-7 gap-1'>
						<File className='h-3.5 w-3.5' />
						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
							Export
						</span>
					</Button>
					<IssueModal ref={issueModalRef} />
				</div>
			</div>

			<Table
				tableTitle='Issue Tracker'
				tableDescription='List of all issues'
				tableHeaders={tableHeaders}
			>
				{issues?.length ? (
					issues?.map((item, index) => (
						<TableRow>
							<TableCell className='font-medium'>{item.id}</TableCell>
							<TableCell className='font-medium'>{item.title}</TableCell>
							<TableCell className='font-medium'>{item.description}</TableCell>
							<TableCell className='font-medium'>{item.createdAt}</TableCell>

							<TableCell className='space-x-2'>
								<Button
									onClick={() => issueModalRef.current?.open(item)}
									className='bg-green-500 hover:bg-green-400'
								>
									<Edit2 className='h-4 w-4' />
								</Button>
								<Button
									onClick={() => handleDelete(item.id)}
									className='bg-red-500 hover:bg-red-400'
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
						<TableCell
							colSpan={5}
							className=' font-medium flex flex-col justify-center '
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-32 text-gray-300'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z'
								/>
							</svg>
							<h4 className='ml-4'>Empty Issues</h4>
						</TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
					</TableRow>
				)}
			</Table>
		</div>
	);
};

export default IssuesWrapper;
