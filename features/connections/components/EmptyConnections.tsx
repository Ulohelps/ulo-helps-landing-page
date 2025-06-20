import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface EmptyConnectionsProps {
  title: string;
  description: string;
}

const EmptyConnections: React.FC<EmptyConnectionsProps> = ({ title, description }) => {
const router= useRouter()

        return (
                <Card className="bg-[#F9FAFB] shadow-none border-none mt-10">
              <CardContent className="flex flex-col items-center justify-center text-center gap-4 py-20">
                <div className="bg-gray-200 p-6 rounded-full">
                  <Users className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 max-w-md">
                        {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button className="" onClick={() => router.push('/find-caregiver')}>
                    Explore caregivers
                  </Button>
                  <Button variant="outline">Request a caregiver</Button>
                </div>
              </CardContent>
            </Card>
        );
};

export default EmptyConnections;