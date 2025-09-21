import React, { useEffect, useState } from 'react';

// ⬇️ Vite scans your assets/images folder
const images = import.meta.glob('../../../assets/images/**/*.{png,jpg,jpeg,gif,svg}', {
  eager: true,
});

interface ImageMeta {
  src: string;
  name: string;
  fullPath: string;
  size?: string;
  width?: number;
  height?: number;
  type?: string;
}

const AllImages: React.FC = () => {
  const [imageData, setImageData] = useState<Record<string, ImageMeta[]>>({});

  useEffect(() => {
    const grouped: Record<string, ImageMeta[]> = {};

    Object.entries(images).forEach(([path, mod]) => {
      const src = (mod as { default: string }).default;
      const parts = path.split('/');
      const folder = parts[parts.length - 2];
      const name = parts[parts.length - 1];

      if (!grouped[folder]) grouped[folder] = [];
      grouped[folder].push({ src, name, fullPath: path });
    });

    // Fetch metadata (size, width, height, type)
    const fetchMeta = async () => {
      const updated: Record<string, ImageMeta[]> = { ...grouped };

      for (const folder in updated) {
        updated[folder] = await Promise.all(
          updated[folder].map(async file => {
            try {
              const res = await fetch(file.src);
              const blob = await res.blob();

              const img = new Image();
              img.src = file.src;

              await new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
              });

              return {
                ...file,
                size: `${(blob.size / 1024).toFixed(1)} KB`,
                type: blob.type,
                width: img.width,
                height: img.height,
              };
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error('Meta fetch failed:', err);
              return file;
            }
          }),
        );
      }

      setImageData(updated);
    };

    fetchMeta();
  }, []);

  const handleCopy = async (text: string) => {
    try {
      // convert relative path to alias path
      const cleanPath = text.replace(/^(\.\.\/)+assets/, '@assets');

      await navigator.clipboard.writeText(cleanPath);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy path', err);
    }
  };

  return (
    <div
      style={{
        background: '#fff',
        color: 'rgb(0 0 0)',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ width: '100%', margin: 'unset', textAlign: 'center' }}>
          📂 All Static Images in Application
        </h1>
      </div>

      {/* Images grouped by folder */}
      {Object.entries(imageData).map(([folder, files]) => (
        <div key={folder} style={{ marginBottom: '40px' }}>
          <h6 style={{ borderBottom: '2px solid #ccc', margin: 'unset', marginBottom: '20px' }}>
            📁 /{folder}
          </h6>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {files.map(file => (
              <div
                key={file.fullPath}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '10px',
                  background: 'rgb(67 67 67)',
                }}
              >
                <img
                  src={file.src}
                  alt={file.name}
                  style={{
                    width: '100%',
                    maxWidth: '100px',
                    height: 'auto',
                    marginBottom: '8px',
                    borderRadius: '4px',
                  }}
                />
                <div style={{ fontSize: '13px', wordBreak: 'break-word', color: 'white' }}>
                  <b>{file.name}</b>
                  <br />
                  {file.size && <div>📏 {file.size}</div>}
                  {file.width && file.height && (
                    <div>
                      🖼 {file.width} × {file.height}
                    </div>
                  )}
                  {file.type && <div>🔖 {file.type}</div>}
                  <div
                    style={{
                      fontSize: '11px',
                      marginTop: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {file.fullPath.replace(/^(\.\.\/)+assets/, '@assets')}
                    </span>
                    <button
                      onClick={() => handleCopy(file.fullPath)}
                      style={{
                        fontSize: '11px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        marginLeft: '6px',
                        background: '#eee',
                      }}
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllImages;
