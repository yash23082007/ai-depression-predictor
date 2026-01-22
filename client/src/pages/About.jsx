import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const About = () => {
    return (
        <div className="max-w-3xl mx-auto py-10 animate-fade-in">
            <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">About the Project</h2>

                <div className="space-y-6 mb-8">
                    <section className="hover:bg-slate-50 p-4 rounded-lg transition-colors">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Mental health is as critical as physical health, yet it often goes unnoticed until it becomes severe.
                            Our mission is to democratize access to preliminary mental health insights using the power of Artificial Intelligence.
                            By providing a private, secure, and immediate assessment tool, we aim to encourage students to reflect on their lifestyle choices
                            and seek professional help when needed. This tool is not a diagnosis but a stepping stone towards better self-awareness.
                        </p>
                    </section>

                    <section className="hover:bg-slate-50 p-4 rounded-lg transition-colors">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Methodology</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            The core of this application is a <strong>Random Forest Classifier</strong>, a robust ensemble learning method.
                            The model constructs a multitude of decision trees during training and outputs the class that is the mode of the classes (depression risk level) of the individual trees.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li><strong>Data Source:</strong> Trained on a synthetic dataset of 25,000 student records, meticulously designed to mimic real-world distributions found in the Kaggle "Student Depression Dataset".</li>
                            <li><strong>Features Analyzed:</strong> We analyze 10 key parameters including Academic Pressure, Sleep Duration, Dietary Habits, Study Satisfaction, and more.</li>
                            <li><strong>Accuracy:</strong> The model achieves an accuracy of approximately <strong>97%</strong> on unseen test data, minimizing false positives while ensuring high sensitivity.</li>
                            <li><strong>Tech Stack:</strong> Built with React.js for a responsive UI, Python Flask as the API gateway, and MongoDB for secure, anonymous data logging.</li>
                        </ul>
                    </section>

                    <section className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 hover:bg-yellow-100 transition-colors">
                        <h3 className="text-lg font-bold text-yellow-800 mb-1">Disclaimer</h3>
                        <p className="text-sm text-yellow-700">
                            This application is for <strong>educational and informational purposes only</strong>. It is not a substitute for professional medical advice, diagnosis, or treatment.
                            If you or someone you know is struggling, please seek help from a qualified mental health professional or contact local emergency services immediately.
                        </p>
                    </section>

                    <section className="hover:bg-slate-50 p-4 rounded-lg transition-colors">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">References</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                            <li>Breiman, L. (2001). <em>Random Forests</em>. Machine Learning, 45(1), 5-32.</li>
                            <li>Pedregosa, F., et al. (2011). <em>Scikit-learn: Machine Learning in Python</em>. JMLR 12, pp. 2825-2830.</li>
                            <li>Kaggle. (2023). <em>Student Depression Dataset</em>. Retrieved from <a href="https://www.kaggle.com" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Kaggle.com</a>.</li>
                        </ul>
                    </section>
                </div>

                <div className="border-t border-gray-100 pt-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Connect with the Developer</h3>
                    <div className="flex gap-4">
                        <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors transform hover:-translate-y-1">
                            <FaGithub /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/yash-vijay-b0a75937a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:-translate-y-1">
                            <FaLinkedin /> LinkedIn
                        </a>
                        <a href="https://www.instagram.com/yash_vj23" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors transform hover:-translate-y-1">
                            <FaInstagram /> Instagram
                        </a>
                        <a href="mailto:ktanayash@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors transform hover:-translate-y-1">
                            ✉️ Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
