import React from 'react';
import { Linkedin } from 'lucide-react';

interface Developer {
  name: string;
  role: string;
  image: string;
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const developers: Developer[] = [
  {
    name: "Mikiyas Ewenetu",
    role: "Developer",
    image: "./photo.jpg",
    links: {
      linkedin: "www.linkedin.com/in/mikiyas-adane-6670bb255",

    }
  },
  {
    name: "Anania Cherkos",
    role: "Developer",
    image: "./anania.jpg",

    links: {
      linkedin: "https://www.linkedin.com/in/ananiatem"
    }
  }
];

export const DevelopersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet the Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {developers.map((dev) => (
          <div key={dev.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <img
                src={dev.image}
                alt={dev.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-center text-gray-900">{dev.name}</h3>
              <p className="text-blue-600 text-center mb-4">{dev.role}</p>
              <div className="flex justify-center space-x-4">

                {dev.links.linkedin && (
                  <a
                    href={dev.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};