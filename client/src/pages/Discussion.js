import moment from 'moment'; // Assurez-vous d'avoir moment installé

const DiscussionPage = () => {
  const comments = [
    {
      id: 1,
      author: 'John Doe',
      content:
        "Premier commentaire. Lorem ipsum dolor sit amet, consectetur adipiscing elit. C'est le thème principal de la discussion.",
      timestamp: '2023-10-15T08:30:00',
      theme: true
    },
    {
      id: 2,
      author: 'Jane Doe',
      content:
        'Deuxième commentaire. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      timestamp: '2023-10-15T09:30:00'
    },
    {
      id: 3,
      author: 'John Doe',
      content:
        'Troisième commentaire. En réponse au deuxième commentaire. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      timestamp: '2023-10-15T10:30:00'
    },
    {
      id: 4,
      author: 'Jane Doe',
      content:
        'Quatrième commentaire. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      timestamp: '2023-10-15T11:30:00'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Discussion sur le forum</h1>
      {comments.map((comment, index) => (
        <div
          key={comment.id}
          className={`bg-white p-6 rounded-lg shadow mb-4 ${
            comment.theme ? 'border-2 border-blue-500' : index === 2 ? 'ml-8' : 'ml-0'
          }`}>
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Avatar de l'utilisateur"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-lg font-semibold">{comment.author}</p>
              <p className="text-sm text-gray-600">{moment(comment.timestamp).fromNow()}</p>
            </div>
          </div>
          <p className="text-gray-800">{comment.content}</p>
        </div>
      ))}
      {/* Formulaire de commentaire */}
      <form className="bg-white p-6 rounded-lg shadow mt-4">
        <textarea
          className="w-full border border-gray-300 rounded-md p-3"
          placeholder="Ajouter un commentaire..."></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="submit">
          Poster
        </button>
      </form>
    </div>
  );
};

export default DiscussionPage;
