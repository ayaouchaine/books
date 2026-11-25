
import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [livres, setLivres] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {

    fetch("https://openlibrary.org/search.json?q=subject:fiction&limit=20")

      .then(reponse => reponse.json())

      .then(donnees => {
        setLivres(donnees.docs);
        setChargement(false);
      })

      .catch(erreur => {
        console.log(erreur);
        setChargement(false);
      });

  }, []);

  return (

    <div className="app">

      <header>
        <h2>EXPLORATEUR<span> DE LIVRES.</span></h2>
        <p>Découvrez votre prochain livre préféré</p>
      </header>

      <section className="hero">
        <span>BIENVENUE DANS NOTRE BIBLIOTHÈQUE</span>

        <h1>
          Découvrez le monde<br />
          des <span>livres.</span>
        </h1>

        <p>
          Explorez des histoires magnifiques et découvrez
          votre prochain livre préféré.
        </p>
      </section>

      <main>

        <div className="section-title">
          <div>
            <span>NOTRE COLLECTION</span>
            <h2>Livres populaires</h2>
          </div>

          <p>{livres.length} livres</p>
        </div>

        {chargement && <h3 className="message">Chargement des livres...</h3>}

        {!chargement && livres.length === 0 && (
          <h3 className="message">Aucun livre trouvé.</h3>
        )}

        <div className="books">

          {livres.map(livre => (

            <div className="card" key={livre.key}>

              <div className="cover">

                {livre.cover_i ? (

                  <img
                    src={`https://covers.openlibrary.org/b/id/${livre.cover_i}-M.jpg`}
                    alt={livre.title}
                  />

                ) : (

                  <span>Pas de couverture</span>

                )}

              </div>

              <div className="info">

                <h3>{livre.title}</h3>

                <p>
                  {livre.author_name ? livre.author_name[0] : "Auteur inconnu"}
                </p>

                <div className="details">
                  <span>📚 Fiction</span>
                  <span>{livre.first_publish_year || "Non disponible"}</span>
                </div>

              </div>

            </div>

          ))}

        </div>

      </main>

      <footer>
        <h2>EXPLORATEUR<span> DE LIVRES.</span></h2>
        <p>Découvrez. Lisez. Imaginez.</p>
      </footer>

    </div>

  );
}

export default App;
