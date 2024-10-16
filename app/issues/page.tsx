import IssuesWrapper from '@/components/IssuesWrapper';
import { Issue } from '@/types/Issue';

const page = async () => {
	const baseUrl = 'http://localhost:4000/api';

	const fetchIssues = async (): Promise<Issue[]> => {
		'use server';
		try {
			const res = await fetch('http://localhost:4000/api/issues', {
				method: 'GET',
				cache: 'no-store', // Ensures data is fetched fresh on each request
			});

			if (!res.ok) {
				throw new Error('Failed to fetch issues');
			}
			const issues = await res.json();
			return issues;
		} catch (error) {
			console.error('Fetch error:', error);
			throw new Error('Error fetching issues');
		}
	};
	const deleteNote = async (): Promise<Issue[]> => {
		'use server';
		try {
			const res = await fetch('http://localhost:4000/api/issues', {
				method: 'GET',
				cache: 'no-store', // Ensures data is fetched fresh on each request
			});

			if (!res.ok) {
				throw new Error('Failed to fetch issues');
			}
			const issues = await res.json();
			return issues;
		} catch (error) {
			console.error('Fetch error:', error);
			throw new Error('Error fetching issues');
		}
	};

	return <IssuesWrapper fetcher={fetchIssues} />;
};

export default page;
