import ReactFlow, { Background, Controls, MiniMap } from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';

const buildNodesAndEdges = (idea) => {
  if (!idea) return { nodes: [], edges: [] };

  const nodes = [
    {
      id: idea._id,
      data: { label: `${idea.title}` },
      position: { x: 0, y: 0 },
      style: { borderRadius: 12, padding: 16, border: '1px solid #a78bfa', background: '#ede9fe' }
    }
  ];

  const edges = [];

  idea.forks?.forEach((fork, index) => {
    nodes.push({
      id: fork._id,
      data: { label: `${fork.title}` },
      position: { x: (index + 1) * 220, y: 120 },
      style: { borderRadius: 12, padding: 16, border: '1px solid #c4b5fd', background: '#f5f3ff' }
    });
    edges.push({ id: `${idea._id}-${fork._id}`, source: idea._id, target: fork._id, animated: true });
  });

  return { nodes, edges };
};

const IdeaChainTree = ({ idea }) => {
  const { nodes, edges } = buildNodesAndEdges(idea);

  if (!nodes.length) {
    return <div className="h-64 flex items-center justify-center text-slate-400">No forks yet.</div>;
  }

  return (
    <div className="h-80 border border-slate-200 rounded-xl overflow-hidden">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default IdeaChainTree;
