const Mentions = () => (
  <section className="container-custom max-w-3xl py-10 sm:py-14">
    <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Mentions légales & Confidentialité</h1>
    <div className="prose prose-sm mt-8 max-w-none space-y-6 text-foreground/85">
      <div>
        <h2 className="font-display text-xl font-bold">Éditeur</h2>
        <p>Marsé Bi — Marché Castors, Dakar, Sénégal. Email : contact@marsebi.sn — Tél. : +221 77 000 00 00.</p>
      </div>
      <div>
        <h2 className="font-display text-xl font-bold">Hébergement</h2>
        <p>Site hébergé sur infrastructure cloud sécurisée. Les transactions sont confirmées par webhook signé HMAC SHA256.</p>
      </div>
      <div>
        <h2 className="font-display text-xl font-bold">Données personnelles</h2>
        <p>Nous collectons uniquement les informations nécessaires au traitement de votre commande (nom, téléphone, adresse). Vos données ne sont jamais revendues. Conformément à la loi sénégalaise n°2008-12, vous disposez d'un droit d'accès, de rectification et de suppression.</p>
      </div>
      <div>
        <h2 className="font-display text-xl font-bold">Cookies</h2>
        <p>Nous utilisons uniquement des cookies techniques pour le fonctionnement du panier.</p>
      </div>
      <div>
        <h2 className="font-display text-xl font-bold">Politique de retour</h2>
        <p>Tout produit non conforme peut être signalé sous 24h après livraison pour échange ou remboursement.</p>
      </div>
    </div>
  </section>
);

export default Mentions;
