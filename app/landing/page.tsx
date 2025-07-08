export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">PlayManager.app</h1>
        <p className="text-lg text-gray-600">
          La prima suite manageriale fantasy dove dirigi un club come nella realtà: Presidente, DS e Allenatore collaborano per portare la squadra al successo. Un'esperienza strategica, umana.
        </p>

        <div className="grid gap-4 text-left">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">🌟 Visione</h2>
            <p className="text-gray-600">
              PlayManager.app trasforma il calcio fantasy in una simulazione gestionale completa. Un progetto che unisce strategia, organizzazione e ruoli autentici.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">🔹 La Suite</h2>
            <ul className="list-disc pl-6 text-gray-600">
              <li><strong>PlayClub</strong> – Presidente: fonda e guida il club</li>
              <li><strong>PlayRoster</strong> – DS: gestisce rosa, mercato, budget</li>
              <li><strong>PlayBoard</strong> – Allenatore: formazioni e campo</li>
              <li><strong>PlayLeague</strong> – Organizzatore: serie A/B, promozioni</li>
              <li><strong>PlayAcademy</strong> – Casi studio e strategia</li>
              <li><strong>PlayPartner</strong> – Collaborazioni reali e future</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">😎 Ruoli e Interazioni</h2>
            <p className="text-gray-600">
              Ogni utente ha un ruolo. Ogni ruolo ha accessi dedicati. Serve comunicare, cooperare, decidere.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">🔄 Un sistema vivo</h2>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Club singoli o con più ruoli attivi</li>
              <li>Comunicazione interna ed esterna</li>
              <li>Leghe strutturate, promozioni e premi</li>
              <li>Crescita meritocratica e progressiva</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">🚀 Prossimamente</h2>
            <p className="text-gray-600">
              Dashboard per ogni ruolo, comunicazioni attive, accesso su invito alla beta.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <p className="text-md italic text-gray-800">
            "Un progetto fantasy. Un'esperienza manageriale vera. Una realtà nuova."
          </p>
        </div>
      </div>
    </div>
  );
}
