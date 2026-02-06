import { useState, useRef } from 'react';
import { useAdmin, SyncStatus } from '../AdminContext';

// Editable Text Component
export function EditableText({
  value,
  onSave,
  tag = 'span',
  className = '',
  inputClassName = '',
}: {
  value: string | number;
  onSave: (val: string) => void;
  tag?: string;
  className?: string;
  inputClassName?: string;
}) {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [tempVal, setTempVal] = useState(String(value));

  if (!isAdmin) {
    const Tag = tag as any;
    return <Tag className={className}>{value}</Tag>;
  }

  if (editing) {
    return (
      <input
        type="text"
        value={tempVal}
        onChange={(e) => setTempVal(e.target.value)}
        onBlur={() => {
          onSave(tempVal);
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSave(tempVal);
            setEditing(false);
          }
          if (e.key === 'Escape') {
            setTempVal(String(value));
            setEditing(false);
          }
        }}
        autoFocus
        className={`border-2 border-blue-400 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-800 ${inputClassName}`}
        style={{ minWidth: '60px' }}
      />
    );
  }

  const Tag = tag as any;
  return (
    <Tag
      className={`${className} cursor-pointer hover:bg-blue-100 hover:ring-2 hover:ring-blue-300 rounded px-1 transition-all duration-200 relative group`}
      onClick={() => {
        setTempVal(String(value));
        setEditing(true);
      }}
      title="Cliquer pour modifier"
    >
      {value}
      <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center transition-opacity">✏️</span>
    </Tag>
  );
}

// Editable Image Component
export function EditableImage({
  src,
  alt,
  className = '',
  onSave,
}: {
  src: string;
  alt: string;
  className?: string;
  onSave: (url: string) => void;
}) {
  const { isAdmin } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [tempUrl, setTempUrl] = useState(src);
  const [preview, setPreview] = useState('');

  if (!isAdmin) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <>
      <div className="relative group cursor-pointer" onClick={() => { setTempUrl(src); setPreview(''); setShowModal(true); }}>
        <img src={src} alt={alt} className={className} />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-inherit">
          <span className="bg-white text-gray-800 px-3 py-2 rounded-lg font-bold text-sm shadow-lg">📷 Changer l'image</span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              📷 Changer l'image
            </h3>

            {/* Current/Preview */}
            <div className="h-40 rounded-xl overflow-hidden mb-4 bg-gray-100">
              <img
                src={preview || src}
                alt="Aperçu"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = src; }}
              />
            </div>

            {/* URL Input */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-1 block">URL de l'image :</label>
              <input
                type="text"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://..."
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
              />
            </div>

            {/* Preview Button */}
            <button
              onClick={() => setPreview(tempUrl)}
              className="w-full mb-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors text-sm"
            >
              👁️ Aperçu
            </button>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  onSave(tempUrl);
                  setShowModal(false);
                }}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors"
              >
                ✅ Enregistrer
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-500 text-center">
              💡 Clic droit sur une image du web → "Copier l'adresse de l'image"
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// Delete Button
export function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const { isAdmin } = useAdmin();
  if (!isAdmin) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onDelete();
      }}
      className="absolute -top-2 -right-2 z-20 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
      title="Supprimer"
    >
      🗑️
    </button>
  );
}

// Add Item Button
export function AddItemButton({ onAdd, label = "Ajouter" }: { onAdd: () => void; label?: string }) {
  const { isAdmin } = useAdmin();
  if (!isAdmin) return null;

  return (
    <button
      onClick={onAdd}
      className="w-full mt-4 py-4 border-3 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2"
    >
      <span className="text-2xl">＋</span> {label}
    </button>
  );
}

// Sync Status Badge
function SyncBadge({ status }: { status: SyncStatus }) {
  const labels: Record<SyncStatus, string> = {
    local: '💾 Local',
    loading: '⏳ Chargement...',
    syncing: '⏳ Sync...',
    synced: '☁️ En ligne',
    error: '❌ Erreur sync',
  };
  const colors: Record<SyncStatus, string> = {
    local: 'bg-gray-600',
    loading: 'bg-yellow-600',
    syncing: 'bg-yellow-600',
    synced: 'bg-green-600',
    error: 'bg-red-600',
  };
  return (
    <span className={`${colors[status]} text-white text-xs font-bold px-2 py-1 rounded-full`}>
      {labels[status]}
    </span>
  );
}

// Share Modal
function ShareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { githubToken, gistId, setupGithub, publishToGithub, getShareUrl, disconnectGithub, syncStatus, exportData, importData } = useAdmin();
  const [token, setToken] = useState('');
  const [step, setStep] = useState<'main' | 'github-setup' | 'connected'>(() => githubToken && gistId ? 'connected' : 'main');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleConnect = async () => {
    if (!token.trim()) { setError('Veuillez entrer un token'); return; }
    setLoading(true); setError('');
    const ok = await setupGithub(token.trim());
    setLoading(false);
    if (ok) { setStep('connected'); setSuccess('✅ Connecté ! Données publiées.'); }
    else { setError('❌ Token invalide.'); }
  };

  const handlePublish = async () => {
    setLoading(true);
    const ok = await publishToGithub();
    setLoading(false);
    if (ok) setSuccess('✅ Publié !');
    else setError('❌ Erreur.');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const ok = importData(ev.target?.result as string);
      if (ok) setSuccess('✅ Données importées !');
      else setError('❌ Fichier invalide.');
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold">✕</button>

        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">📤 Publier & Partager</h3>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl mb-4 text-sm">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl mb-4 text-sm">{success}</div>}

        {step === 'main' && (
          <div className="space-y-4">
            {/* GitHub */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-2">🐙 GitHub (recommandé)</h4>
              <p className="text-sm text-gray-600 mb-3">Sauvegarde en ligne, visible par tous les visiteurs</p>
              <button onClick={() => setStep('github-setup')} className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-colors">
                Connecter GitHub
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-bold text-gray-800 mb-2">💾 Sauvegarde fichier</h4>
              <div className="flex gap-2">
                <button onClick={exportData} className="flex-1 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl font-medium transition-colors text-sm">
                  📥 Exporter .json
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="flex-1 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl font-medium transition-colors text-sm">
                  📤 Importer .json
                </button>
                <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
              </div>
            </div>
          </div>
        )}

        {step === 'github-setup' && (
          <div className="space-y-4">
            <button onClick={() => setStep('main')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">← Retour</button>
            <div className="bg-amber-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-3">Configuration GitHub :</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                  <div>
                    <p>Allez sur <a href="https://github.com/settings/tokens/new?scopes=gist&description=Pizza+Rasil+Menu" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold">GitHub → New Token</a></p>
                    <p className="text-gray-500">Expiration: No expiration, Cochez: gist</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                  <p>Cliquez "Generate token" et copiez le token</p>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Token GitHub :</label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_..."
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-blue-400 outline-none"
              />
            </div>
            <button
              onClick={handleConnect}
              disabled={loading}
              className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl font-bold transition-colors"
            >
              {loading ? '⏳ Connexion...' : '🔗 Connecter'}
            </button>
          </div>
        )}

        {step === 'connected' && (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-green-800">Connecté à GitHub</p>
                <SyncBadge status={syncStatus} />
              </div>
            </div>

            {/* Share Link */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-2">🔗 Lien de partage :</h4>
              <div className="flex gap-2">
                <input type="text" value={getShareUrl()} readOnly className="flex-1 bg-white border rounded-lg px-3 py-2 text-sm text-gray-600" />
                <button onClick={handleCopyLink} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors text-sm">
                  {linkCopied ? '✅' : '📋'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Partagez ce lien — tous les visiteurs verront votre menu à jour</p>
            </div>

            <button onClick={handlePublish} disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-bold transition-colors">
              {loading ? '⏳ Publication...' : '📤 Publier maintenant'}
            </button>

            <div className="border-t border-gray-200 pt-4 flex gap-2">
              <button onClick={exportData} className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors text-sm">
                📥 Export .json
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors text-sm">
                📤 Import .json
              </button>
              <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
            </div>

            <button onClick={() => { disconnectGithub(); setStep('main'); }} className="w-full py-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
              🔌 Déconnecter GitHub
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Admin Login Modal
export function AdminLoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setPassword('');
      setError(false);
      onClose();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold">✕</button>
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">🔐 Administration</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Code d'accès"
            className={`w-full border-2 rounded-xl px-4 py-3 outline-none text-center text-lg tracking-widest mb-4 ${
              error ? 'border-red-400 bg-red-50 animate-shake' : 'border-gray-300 focus:border-blue-400'
            }`}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm text-center mb-3">❌ Code incorrect</p>}
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

// Admin Floating Button
export function AdminFloatingButton() {
  const { isAdmin } = useAdmin();
  const [showLogin, setShowLogin] = useState(false);

  if (isAdmin) return null;

  return (
    <>
      <button
        onClick={() => setShowLogin(true)}
        className="fixed top-4 right-4 z-50 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Administration"
      >
        <span className="text-lg">⚙️</span>
      </button>
      <AdminLoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

// Admin Top Bar
export function AdminBar() {
  const { isAdmin, logout, resetData, syncStatus } = useAdmin();
  const [showShare, setShowShare] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] bg-blue-600 text-white py-2 px-4 flex items-center justify-between text-sm shadow-lg">
        <div className="flex items-center gap-3">
          <span className="font-bold">🛠️ Mode Admin</span>
          <SyncBadge status={syncStatus} />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowShare(true)} className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium">
            📤 Publier
          </button>
          <button
            onClick={() => { if (confirm('Réinitialiser toutes les données ?')) resetData(); }}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors font-medium"
          >
            🔄 Réinitialiser
          </button>
          <button onClick={logout} className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg transition-colors font-medium">
            🚪 Quitter
          </button>
        </div>
      </div>
      <div className="h-10" />
      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} />
    </>
  );
}
