import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Issue } from '@/types/Issue';
import { PlusCircle } from 'lucide-react';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { mutate } from 'swr';

// Define the type for the forwarded ref
interface IssueModalHandle {
	open: (item: Issue | null) => void;
}

// IssueModal component with forwardRef and useImperativeHandle
const IssueModal = forwardRef<IssueModalHandle>((_, ref) => {
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [toggle, setToggle] = useState<boolean>(false);
	const [item, setItem] = useState<Issue | null>(null);

	// Exposing the open method using useImperativeHandle
	useImperativeHandle(ref, () => ({
		open: (itemToEdit: Issue | null) => {
			if (itemToEdit) {
				setItem(itemToEdit);
				// If item is provided, set the state for editing
				setTitle(itemToEdit.title);
				setDescription(itemToEdit.description);
			} else {
				// If no item, reset form for new issue creation
				setItem(null);
				setTitle('');
				setDescription('');
			}
			setToggle(true); // Open the modal
		},
	}));

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !description) {
			console.log('Title and description are required.');
			return;
		}

		try {
			let res;
			if (item) {
				// Update an existing issue
				res = await fetch(`http://localhost:4000/api/issues/${item.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						...item,
						title: title,
						description: description,
					}),
				});
			} else {
				// Create a new issue
				res = await fetch('http://localhost:4000/api/issues', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title: title,
						description: description,
					}),
				});
			}

			if (!res.ok) {
				throw new Error('Failed to create/update issue');
			}

			mutate('api/issues'); // Refresh data
			setToggle(false); // Close the modal after success
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<Dialog open={toggle} onOpenChange={setToggle}>
			<DialogTrigger asChild>
				<Button
					onClick={() => setToggle(true)}
					className='flex items-center gap-2'
				>
					<PlusCircle className='h-3.5 w-3.5' />
					<span>{item ? 'Edit Issue' : 'Create Issue'}</span>
				</Button>
			</DialogTrigger>
			<form onSubmit={handleSubmit}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>
							{item ? 'Edit Issue' : 'Create New Issue'}
						</DialogTitle>
						<DialogDescription>
							{item
								? 'Make changes to this issue and save.'
								: 'Fill in the details to create a new issue.'}
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='title' className='text-right'>
								Title
							</Label>
							<Input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								id='title'
								placeholder='Enter issue title'
								className='col-span-3'
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='description' className='text-right'>
								Description
							</Label>
							<Input
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								id='description'
								placeholder='Enter issue description'
								className='col-span-3'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button onClick={handleSubmit}>
							{item ? 'Save Changes' : 'Create Issue'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
});

export default IssueModal;
