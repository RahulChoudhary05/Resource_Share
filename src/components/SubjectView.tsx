import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FileText, Youtube, Link as LinkIcon, Upload } from 'lucide-react';

interface Resource {
  _id: string;
  title: string;
  description: string;
  type: 'pdf' | 'youtube' | 'link';
  url: string;
  uploadedBy: {
    name: string;
  };
}

const SubjectView = () => {
  const { semester, subject } = useParams<{ semester: string; subject: string }>();
  const [resources, setResources] = useState<Resource[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { isAuthenticated, token } = useAuth();
  
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'pdf',
    url: ''
  });

  useEffect(() => {
    fetchResources();
  }, [semester, subject]);

  const fetchResources = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/resources/subject/${subject}`);
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      await axios.post(
        'http://localhost:5000/api/resources',
        {
          ...newResource,
          semester: Number(semester),
          subject
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setNewResource({ title: '', description: '', type: 'pdf', url: '' });
      fetchResources();
    } catch (error) {
      console.error('Error uploading resource:', error);
    }
    setIsUploading(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'youtube':
        return <Youtube className="h-6 w-6 text-red-600" />;
      case 'link':
        return <LinkIcon className="h-6 w-6 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {subject} - Semester {semester}
      </h1>

      {isAuthenticated && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Type</label>
                <select
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value as 'pdf' | 'youtube' | 'link' })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="pdf">PDF</option>
                  <option value="youtube">YouTube</option>
                  <option value="link">Link</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">URL</label>
                <input
                  type="url"
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isUploading}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload Resource'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {resources.map((resource) => (
          <div key={resource._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-4">
              {getIcon(resource.type)}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{resource.title}</h3>
                <p className="text-gray-600 mb-2">{resource.description}</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Access Resource
                </a>
                <p className="text-sm text-gray-500 mt-2">
                  Uploaded by {resource.uploadedBy.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectView;