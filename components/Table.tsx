import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table as TableCN,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Badge } from './ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { ReactNode } from 'react';

interface iProps {
	tableTitle: string;
	tableDescription: string;
	tableHeaders: string[];
	children: ReactNode;
}
const Table = ({
	tableTitle,
	tableDescription,
	tableHeaders,
	children,
}: iProps) => {
	return (
		<Card className='mt-5'>
			<CardHeader>
				<CardTitle>{tableTitle}</CardTitle>
				<CardDescription>{tableDescription}</CardDescription>
			</CardHeader>
			<CardContent>
				<TableCN>
					<TableHeader>
						<TableRow>
							{tableHeaders.map((item, index) => (
								<TableHead className='capitalize' key={index}>
									{item}
								</TableHead>
							))}

							<TableHead>
								<span className='sr-only'>Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>{children}</TableBody>
				</TableCN>
			</CardContent>
			<CardFooter>
				<div className='text-xs text-muted-foreground'>
					Showing <strong>1-10</strong> of <strong>32</strong> products
				</div>
			</CardFooter>
		</Card>
	);
};

export default Table;
