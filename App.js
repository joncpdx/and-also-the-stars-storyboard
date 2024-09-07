import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

const initialScenes = [
  { id: 1, act: 1, title: "Seve's Childhood Encounter", summary: "Young Seve experiences the demon mist for the first time, showing curiosity rather than fear." },
  { id: 2, act: 1, title: "Seven Years Later", summary: "Seve, now a teenager, ponders the mist's six-year absence and its potential connection to him." },
  { id: 3, act: 1, title: "Seve as a Herder", summary: "Seve works with intelligent Gretchen worms, showcasing his connection to creatures." },
  { id: 4, act: 1, title: "The Comet Crashes", summary: "Seve discovers Tech, the AI creature, believing it to be a new type of creature." },
  { id: 5, act: 1, title: "Ka's Arrival", summary: "Warrior girl Ka comes to the village, convincing elders to send Seve to investigate the crater." },
  { id: 6, act: 2, title: "Tech Communicates", summary: "Tech's shell turns to dust, and it begins speaking to Seve, starting their partnership." },
  { id: 7, act: 2, title: "Mind-Reading Ability", summary: "Tech grants Seve the ability to read creatures' minds, deepening his connection to them." },
  { id: 8, act: 2, title: "Village Calls Off Search", summary: "The village stops searching for the creature, but Seve continues investigating with Tech." },
  { id: 9, act: 2, title: "Ka's Secret Revealed", summary: "Seve learns that Ka's sister is a scribe, adding complexity to their relationship." },
  { id: 10, act: 2, title: "The Scroll Discovery", summary: "The group learns about a scroll with crucial information about the demon mist." },
  { id: 11, act: 2, title: "Capture and Alliance", summary: "Seve is caught by Ka and her sister, leading to an unexpected alliance." },
  { id: 12, act: 2, title: "Scribal Council Obstacle", summary: "The group is imprisoned by the Scribal Council for accessing hidden knowledge." },
  { id: 13, act: 2, title: "Escape Plan", summary: "Seve and Tech orchestrate an escape from the Scribal Council's imprisonment." },
  { id: 14, act: 3, title: "Regrouping in Warrior Town", summary: "The group prepares for their journey into the Boundary Lands, enlisting help from Ka's friends." },
  { id: 15, act: 3, title: "Journey to Boundary Lands", summary: "The group sets out to explore beyond the known boundaries of their world." },
  { id: 16, act: 3, title: "Superintelligence Revealed", summary: "The group discovers the true role of the superintelligence in controlling humanity." },
  { id: 17, act: 3, title: "Defeating the Demon Mist", summary: "Using knowledge from the scroll and Tech's help, the group confronts and defeats the demon mist." },
  { id: 18, act: 3, title: "Beyond the Boundary", summary: "The group discovers a new land and encounters people living on a mountain." },
  { id: 19, act: 3, title: "Seve's Sacrifice", summary: "Seve shares his friendship with Tech and knowledge with others, leading to a final confrontation." },
  { id: 20, act: 3, title: "Final Battle", summary: "The group faces off against a part-AI brute from the Scribal Council on the mountain." }
];

const StoryBoard = () => {
  const [scenes, setScenes] = useState(initialScenes);
  const [editingScene, setEditingScene] = useState(null);

  const addScene = (act) => {
    const newScene = { id: scenes.length + 1, act, title: "New Scene", summary: "Add summary here" };
    setScenes([...scenes, newScene]);
    setEditingScene(newScene);
  };

  const updateScene = (id, updatedScene) => {
    setScenes(scenes.map(scene => scene.id === id ? { ...scene, ...updatedScene } : scene));
    setEditingScene(null);
  };

  const deleteScene = (id) => {
    setScenes(scenes.filter(scene => scene.id !== id));
  };

  const moveScene = (id, direction) => {
    setScenes(scenes.map(scene => {
      if (scene.id === id) {
        const newAct = scene.act + direction;
        if (newAct >= 1 && newAct <= 3) {
          return { ...scene, act: newAct };
        }
      }
      return scene;
    }));
  };

  const SceneCard = ({ scene }) => (
    <div className="bg-white p-4 rounded shadow mb-2">
      <h3 className="font-bold">{scene.title}</h3>
      <p className="text-sm">{scene.summary}</p>
      <div className="mt-2 flex justify-between">
        <div>
          <button onClick={() => moveScene(scene.id, -1)} className="text-blue-500 mr-2" disabled={scene.act === 1}>
            <ArrowLeft size={16} />
          </button>
          <button onClick={() => moveScene(scene.id, 1)} className="text-blue-500 mr-2" disabled={scene.act === 3}>
            <ArrowRight size={16} />
          </button>
        </div>
        <div>
          <button onClick={() => setEditingScene(scene)} className="text-blue-500 mr-2"><Edit2 size={16} /></button>
          <button onClick={() => deleteScene(scene.id)} className="text-red-500"><Trash2 size={16} /></button>
        </div>
      </div>
    </div>
  );

  const EditSceneForm = ({ scene }) => (
    <div className="bg-white p-4 rounded shadow mb-2">
      <input
        className="w-full mb-2 p-1 border rounded"
        value={scene.title}
        onChange={(e) => updateScene(scene.id, { title: e.target.value })}
        placeholder="Scene Title"
      />
      <textarea
        className="w-full mb-2 p-1 border rounded"
        value={scene.summary}
        onChange={(e) => updateScene(scene.id, { summary: e.target.value })}
        placeholder="Scene Summary"
      />
      <button onClick={() => setEditingScene(null)} className="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
    </div>
  );

  return (
    <div className="flex justify-around p-4 bg-gray-100">
      {[1, 2, 3].map(act => (
        <div key={act} className="w-1/3 px-2">
          <h2 className="text-xl font-bold mb-4">Act {act}</h2>
          {scenes
            .filter(scene => scene.act === act)
            .map(scene => (
              editingScene && editingScene.id === scene.id 
                ? <EditSceneForm key={scene.id} scene={editingScene} />
                : <SceneCard key={scene.id} scene={scene} />
            ))
          }
          <button onClick={() => addScene(act)} className="mt-2 bg-green-500 text-white px-2 py-1 rounded flex items-center">
            <Plus size={16} className="mr-1" /> Add Scene
          </button>
        </div>
      ))}
    </div>
  );
};

export default StoryBoard;
