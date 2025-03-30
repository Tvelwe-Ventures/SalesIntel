import React, { useState, useEffect } from 'react';

const DataFlowAnimation = () => {
  // Animation states
  const [activeFlows, setActiveFlows] = useState({});
  const [textRotations, setTextRotations] = useState({});
  
  // Data sources definition
  const leftSources = [
    { id: 'sales-collateral', label: 'Sales Collateral', icon: '📊', color: '#e27d60' },
    { id: 'intent-signals', label: 'Intent Signals', icon: '🎯', color: '#41b3a3' },
    { id: 'value-framework', label: 'Value Framework', icon: '📝', color: '#f9c74f' },
    { id: 'crm', label: 'CRM', icon: '💼', color: '#4d96ff' },
    { id: 'contact-data', label: 'Contact Data', icon: '👥', color: '#c75146' },
  ];
  
  const rightSources = [
    { id: 'financial-reports', label: 'Financial Reports', icon: '📈', color: '#35495e' },
    { id: 'job-boards', label: 'Job Boards', icon: 'ℹ️', color: '#3498db' },
    { id: 'company-news', label: 'Company News', icon: '📰', color: '#2c3e50' },
    { id: 'podcasts-video', label: 'Podcasts & Video', icon: '🎙️', color: '#1db954' },
    { id: 'org-charts', label: 'Org Charts', icon: '🔗', color: '#0e76a8' },
  ];
  
  // Initialize text rotation effect
  useEffect(() => {
    // Set initial random rotations
    const initialRotations = {};
    [...leftSources, ...rightSources].forEach(source => {
      initialRotations[source.id] = -1 + Math.random() * 2;
    });
    setTextRotations(initialRotations);
    
    // Rotation animation interval
    const rotationInterval = setInterval(() => {
      setTextRotations(prev => {
        const newRotations = { ...prev };
        [...leftSources, ...rightSources].forEach(source => {
          // Small random adjustment to current rotation (-0.2 to +0.2 degrees)
          newRotations[source.id] = prev[source.id] + (-0.2 + Math.random() * 0.4);
          
          // Keep rotation within bounds (-2 to 2 degrees)
          if (newRotations[source.id] > 2) newRotations[source.id] = 2;
          if (newRotations[source.id] < -2) newRotations[source.id] = -2;
        });
        return newRotations;
      });
    }, 100);
    
    return () => clearInterval(rotationInterval);
  }, []);
  
  // Data flow animation
  useEffect(() => {
    // Function to trigger a single data flow animation
    const triggerFlow = () => {
      // Select random source
      const allSources = [...leftSources, ...rightSources];
      const randomSource = allSources[Math.floor(Math.random() * allSources.length)];
      
      // Determine if flow is inbound or outbound (to or from the central hub)
      const flowDirection = Math.random() > 0.5 ? 'inbound' : 'outbound';
      
      // Set this flow as active
      setActiveFlows(prev => ({
        ...prev,
        [randomSource.id]: { active: true, direction: flowDirection }
      }));
      
      // After animation completes, set it back to inactive
      setTimeout(() => {
        setActiveFlows(prev => ({
          ...prev,
          [randomSource.id]: { active: false, direction: flowDirection }
        }));
      }, 1500); // Animation duration
    };
    
    // Start periodic flow animations
    const flowInterval = setInterval(triggerFlow, 800);
    
    return () => clearInterval(flowInterval);
  }, []);
  
  // Utility function to determine if a flow is currently active
  const isFlowActive = (sourceId) => {
    return activeFlows[sourceId]?.active || false;
  };
  
  // Utility function to get flow direction
  const getFlowDirection = (sourceId) => {
    return activeFlows[sourceId]?.direction || 'inbound';
  };

  return (
    <div className="relative w-full h-full bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Central hub */}
      <div className="absolute z-10 w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="w-8 h-8 bg-white transform rotate-45">
          <div className="w-6 h-6 bg-gray-800 m-1"></div>
        </div>
      </div>
      
      {/* Left data sources */}
      <div className="absolute left-8 flex flex-col space-y-6">
        {leftSources.map((source, index) => (
          <div 
            key={source.id} 
            className="relative w-64 h-14 bg-gray-800 rounded-lg flex items-center px-4"
          >
            <div className="flex-1">
              <div 
                className="text-gray-100 font-medium transition-transform duration-100"
                style={{ transform: `rotate(${textRotations[source.id] || 0}deg)` }}
              >
                {source.label}
              </div>
            </div>
            <div 
              className="w-8 h-8 rounded flex items-center justify-center text-white"
              style={{ backgroundColor: source.color }}
            >
              {source.icon}
            </div>
            
            {/* Data flow line */}
            <div className="absolute right-0 w-[calc(50vw-8rem)] h-px border-t border-dashed border-gray-600">
              {isFlowActive(source.id) && (
                <div 
                  className={`h-1.5 w-1.5 rounded-full bg-white absolute top-[-3px] ${
                    getFlowDirection(source.id) === 'inbound' 
                      ? 'animate-flow-left-to-center'
                      : 'animate-flow-center-to-left'
                  }`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Right data sources */}
      <div className="absolute right-8 flex flex-col space-y-6">
        {rightSources.map((source, index) => (
          <div 
            key={source.id} 
            className="relative w-64 h-14 bg-gray-800 rounded-lg flex items-center px-4"
          >
            <div 
              className="w-8 h-8 rounded flex items-center justify-center text-white"
              style={{ backgroundColor: source.color }}
            >
              {source.icon}
            </div>
            <div className="flex-1 text-right">
              <div 
                className="text-gray-100 font-medium transition-transform duration-100"
                style={{ transform: `rotate(${textRotations[source.id] || 0}deg)` }}
              >
                {source.label}
              </div>
            </div>
            
            {/* Data flow line */}
            <div className="absolute left-0 w-[calc(50vw-8rem)] h-px border-t border-dashed border-gray-600">
              {isFlowActive(source.id) && (
                <div 
                  className={`h-1.5 w-1.5 rounded-full bg-white absolute top-[-3px] ${
                    getFlowDirection(source.id) === 'inbound'
                      ? 'animate-flow-right-to-center'
                      : 'animate-flow-center-to-right'
                  }`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes flowLeftToCenter {
          0% { left: 0%; }
          100% { left: 100%; }
        }
        
        @keyframes flowCenterToLeft {
          0% { left: 100%; }
          100% { left: 0%; }
        }
        
        @keyframes flowRightToCenter {
          0% { right: 0%; }
          100% { right: 100%; }
        }
        
        @keyframes flowCenterToRight {
          0% { right: 100%; }
          100% { right: 0%; }
        }
        
        .animate-flow-left-to-center {
          animation: flowLeftToCenter 1.5s ease-in-out;
        }
        
        .animate-flow-center-to-left {
          animation: flowCenterToLeft 1.5s ease-in-out;
        }
        
        .animate-flow-right-to-center {
          animation: flowRightToCenter 1.5s ease-in-out;
        }
        
        .animate-flow-center-to-right {
          animation: flowCenterToRight 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default DataFlowAnimation;
