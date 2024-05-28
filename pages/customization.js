import Layout from '@/components/Layout';
import React from 'react';

function customization() {
    return (
        <Layout>
            <div className="w-full p-4">
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-4">Customize the Header</h3>
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">Change the Header Color</h4>
                        <input type="color" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2">Change the Header text</h4>
                        <input type="text" className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400" placeholder="Change the header text" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Change the Image Background</h4>
<input type="file"/>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default customization;
