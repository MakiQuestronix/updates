interface Knowledge {
  name: string;
  workspace: string;
}

interface Props {
  knowledge: Knowledge;
  onClose: () => void;
}

function KnowledgeConfirmation({ knowledge, onClose }: Props) {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold">
              Knowledge Base Created Successully
            </h4>
            <button
              onClick={onClose}
              className="text-black text-sm font-bold -mt-4"
            >
              ✕
            </button>
          </div>
          <p className="font-semibold">Knowledge Base</p>
          <p>{knowledge.name}</p>

          <p className="font-semibold mt-4">Workspace</p>
          <p>{knowledge.workspace}</p>

          <div className="flex justify-center gap-6 mt-8">
            <button className="py-1 px-8 w-fit rounded-md bg-third text-sm text-white hover:bg-gray-600">
              Open Knowledge Base
            </button>
            <button
              onClick={onClose}
              className="py-1 w-fit rounded-md bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-60 px-8"
            >
              Return to List
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default KnowledgeConfirmation;
