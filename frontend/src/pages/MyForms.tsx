import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendURL } from '@/lib/backendURL';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker'; // Updated DatePicker component

const MyForms: React.FC = () => {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  // Fetch Submissions from API
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendURL}/api/form/submissions`, {
        params: {
          search,
          startDate: startDate ? startDate.toISOString() : undefined,
          endDate: endDate ? endDate.toISOString() : undefined,
        },
        withCredentials: true,
      });
      setSubmissions(response.data.submissions);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErrMsg(error.response?.data.message || 'Error fetching submissions');
    }
  };

  // Fetch submissions on component mount or when filters change
  useEffect(() => {
    fetchSubmissions();
  }, [search, startDate, endDate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>
      
      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        
        <DatePicker 
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          className="w-1/4"
        />
        <DatePicker 
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="w-1/4"
        />
        <Button onClick={fetchSubmissions} className="bg-blue-600 text-white">Filter</Button>
      </div>

      {/* Display Error */}
      {errMsg && <div className="text-red-600 mb-4">{errMsg}</div>}

      {/* Display Loading */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Submissions Table */}
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">City</th>
                <th className="py-2 px-4 border-b">State</th>
                <th className="py-2 px-4 border-b">Country</th>
                <th className="py-2 px-4 border-b">Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission: any) => (
                <tr key={submission.id}>
                  <td className="py-2 px-4 border-b">{submission.name}</td>
                  <td className="py-2 px-4 border-b">{submission.email}</td>
                  <td className="py-2 px-4 border-b">{submission.city}</td>
                  <td className="py-2 px-4 border-b">{submission.state}</td>
                  <td className="py-2 px-4 border-b">{submission.country}</td>
                  <td className="py-2 px-4 border-b">{new Date(submission.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyForms;
