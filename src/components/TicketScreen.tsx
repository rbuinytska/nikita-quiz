import React, { useRef, useState } from 'react';
import { StageBackground } from './StageBackground';
import { appConfig } from '../config';
import { assetUrl } from '../utils/assets';

interface TicketScreenProps {
  onRestart: () => void;
  onShowCake?: () => void;
}

export const TicketScreen: React.FC<TicketScreenProps> = ({ onRestart, onShowCake }) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [copiedNotification, setCopiedNotification] = useState('');

  // Download real PDF voucher
  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = assetUrl('assets/poukaz-tandemovy-zoskok.pdf');
    link.download = 'Tandemovy_zoskok_padakom_Nikita.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share ticket / link
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `С днюхой, Никита! 🎂 Квиз на 23 года`,
          text: `Праздничный квиз для Никиты на 23 года! Пройди все вопросы и открой секретный подарок ✨`,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }

    // Fallback: copy link
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedNotification('Ссылка скопирована!');
      setTimeout(() => setCopiedNotification(''), 2500);
    } catch {
      // Ignored
    }
  };

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        minHeight: '100dvh',
        boxSizing: 'border-box',
        background: '#FFD6EA',
        color: '#1A1020',
        padding: 'max(16px, env(safe-area-inset-top, 16px)) 20px calc(24px + env(safe-area-inset-bottom, 16px))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <StageBackground />

      {/* Top Lanyard Ribbon */}
      <svg
        aria-hidden="true"
        width="110"
        height="102"
        viewBox="0 0 110 102"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      >
        <path d="M26 0 L55 90 M84 0 L55 90" stroke="#E0167A" strokeWidth="15" strokeLinecap="round" />
        <rect x="41" y="78" width="28" height="26" rx="6" fill="#9AA3B5" stroke="#1A1020" strokeWidth="2" />
      </svg>

      {/* Ticket Pass Element */}
      <div
        ref={ticketRef}
        className="sway"
        style={{
          marginTop: '96px',
          width: 'min(316px, 90vw)',
          boxSizing: 'border-box',
          borderRadius: '22px',
          background: '#FFFFFF',
          border: '2px solid #1A1020',
          boxShadow: '0 18px 40px rgba(26, 16, 32, 0.18)',
          overflow: 'hidden',
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px 14px',
            background: '#E0167A',
            color: '#FFFFFF',
          }}
        >
          <div aria-hidden="true" style={{ width: '54px', height: '10px', borderRadius: '5px', background: '#FFD6EA' }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 900,
              fontSize: '14px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10a9 7 0 0 1 18 0" />
              <path d="M3 10q2.25-1.5 4.5 0q2.25-1.5 4.5 0q2.25-1.5 4.5 0q2.25-1.5 4.5 0" />
              <path d="M3 10l8 9M21 10l-8 9M7.5 10l3.5 9M16.5 10l-3.5 9" />
              <rect x="10.5" y="18.5" width="3" height="3" rx="0.8" />
            </svg>
            Проход в небо
          </div>
        </div>

        <div style={{ padding: '16px 20px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Passenger Info & Avatar in clean flex row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
              <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5C3A4E' }}>
                Посадочный пропуск
              </div>
              <div style={{ fontWeight: 900, fontSize: 'clamp(32px, 8.5vw, 42px)', lineHeight: 0.95, letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#1A1020' }}>
                {appConfig.ticket.passenger}
              </div>
              <div className="font-playfair" style={{ fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(14px, 4.2vw, 17px)', color: '#E0167A', marginTop: '2px' }}>
                вайб: свободное падение
              </div>
            </div>

            {/* Avatar Photo */}
            <div
              style={{
                width: '68px',
                height: '68px',
                flexShrink: 0,
                boxSizing: 'border-box',
                borderRadius: '50%',
                border: '3px solid #E0167A',
                background: `#FFE9F3 url(${assetUrl('assets/nikita.jpg')}) center/cover no-repeat`,
                boxShadow: '0 4px 14px rgba(224, 22, 122, 0.25)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={assetUrl('assets/nikita.jpg')}
                alt="Никита"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px', paddingTop: '14px', borderTop: '2px dashed #F3BCD6' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Формат</div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>{appConfig.ticket.format}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Высота</div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>{appConfig.ticket.height} м</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Дата</div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>{appConfig.ticket.date}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Статус</div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>иконка 💅</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#5C3A4E' }}>Аэродром</div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>{appConfig.ticket.airfield}</div>
            </div>
          </div>

          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', color: '#5C3A4E', textAlign: 'center', marginTop: '4px' }}>
            № {appConfig.ticket.certificateNumber}
          </div>
        </div>
      </div>

      <div style={{ minHeight: '16px', flexGrow: 1 }} />

      {/* Bottom text & actions */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'center', zIndex: 2, flexShrink: 0 }}>
        <h1 className="font-playfair" style={{ margin: 0, fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(26px, 7vw, 32px)', lineHeight: 1.05 }}>
          Вот твой билет <span style={{ color: '#E0167A' }}>в небо</span>
        </h1>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.45, fontWeight: 500, color: '#5C3A4E' }}>
          Энергия главного героя — на высоте {appConfig.ticket.height} м
        </p>

        {copiedNotification && (
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#1F9D55' }}>
            {copiedNotification}
          </div>
        )}

        {/* Main Action: Download real PDF certificate */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          style={{
            width: '100%',
            height: '58px',
            borderRadius: '999px',
            border: 0,
            background: '#E0167A',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '17px',
            boxShadow: '0 8px 24px rgba(224, 22, 122, 0.35)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '4px',
            transition: 'transform 0.15s ease',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Скачать сертификат (PDF)</span>
        </button>

        {/* Secondary Action: Похвастаться */}
        <button
          type="button"
          onClick={handleShare}
          style={{
            width: '100%',
            height: '52px',
            boxSizing: 'border-box',
            borderRadius: '999px',
            border: '2px solid #1A1020',
            background: '#FFFFFF',
            color: '#1A1020',
            fontWeight: 800,
            fontSize: '15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '2px',
          }}
        >
          <span>Похвастаться</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1020" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>

        {onShowCake && (
          <button
            type="button"
            onClick={onShowCake}
            style={{
              width: '100%',
              height: '48px',
              boxSizing: 'border-box',
              borderRadius: '999px',
              border: '1.5px solid #E0167A',
              background: '#FFE9F3',
              color: '#E0167A',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>🎂 Посмотреть праздничный торт</span>
          </button>
        )}

        <button
          type="button"
          onClick={onRestart}
          style={{
            background: 'transparent',
            border: 0,
            color: '#5C3A4E',
            fontSize: '13px',
            fontWeight: 700,
            textDecoration: 'underline',
            padding: '8px',
            cursor: 'pointer',
            marginTop: '2px',
          }}
        >
          Пройти квиз заново
        </button>
      </div>
    </div>
  );
};
