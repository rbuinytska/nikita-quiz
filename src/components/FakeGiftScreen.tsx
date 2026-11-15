import React, { useState } from 'react';
import { StageBackground } from './StageBackground';

interface FakeGiftScreenProps {
  onContinue: () => void;
}

const resolveAsset = (src: string) => {
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const clean = src.replace(/^\.?\//, '');
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + '/';
  return `${base}${clean}`;
};

export const FakeGiftScreen: React.FC<FakeGiftScreenProps> = ({ onContinue }) => {
  const [isPrankRevealed, setIsPrankRevealed] = useState(false);

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        minHeight: '100dvh',
        boxSizing: 'border-box',
        background: '#FFD6EA',
        color: '#1A1020',
        padding: 'max(48px, calc(env(safe-area-inset-top, 16px) + 36px)) 20px calc(24px + env(safe-area-inset-bottom, 16px))',
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

      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '360px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#E0167A',
            background: 'rgba(255, 255, 255, 0.85)',
            padding: '4px 14px',
            borderRadius: '999px',
            border: '1.5px solid #E0167A',
          }}
        >
          Финальный подарок 🎁
        </div>
        <h1
          className="font-playfair"
          style={{
            margin: '4px 0 0',
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: 'clamp(28px, 7vw, 34px)',
            lineHeight: 1.1,
          }}
        >
          Твой главный <span style={{ color: '#E0167A' }}>сюрприз!</span>
        </h1>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#5C3A4E' }}>
          Ты прошёл все испытания. Вот то, о чём ты так долго мечтал:
        </p>
      </div>

      {/* Cinema City Fake Ticket Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '350px',
          background: '#1A1020',
          borderRadius: '24px',
          border: '3px solid #1A1020',
          boxShadow: '0 12px 32px rgba(0,0,0,0.22)',
          color: '#FFFFFF',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 2,
          margin: '14px 0',
        }}
      >
        {/* Ticket Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FF4500, #E0167A)',
            padding: '12px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🎬</span>
            <span style={{ fontWeight: 900, letterSpacing: '0.12em', fontSize: '15px' }}>
              CINEMA CITY VIP
            </span>
          </div>
          <span
            style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 800,
            }}
          >
            3x БИЛЕТА
          </span>
        </div>

        {/* Squad Photo */}
        <div
          style={{
            width: '100%',
            height: '270px',
            position: 'relative',
            overflow: 'hidden',
            background: '#1A1020',
          }}
        >
          <img
            src={resolveAsset('assets/fake-gift-photo.jpg')}
            alt="Cinema crew"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              display: 'block',
            }}
          />
        </div>

        {/* Movie Info */}
        <div style={{ padding: '14px 18px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1.2, color: '#FFD6EA' }}>
                «Голодные игры» 🏹
              </div>
              <div style={{ fontSize: '12px', color: '#B39EB5', marginTop: '2px' }}>
                Баллада о змеях и певчих птицах
              </div>
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                color: '#FFD6EA',
                background: 'rgba(224, 22, 122, 0.3)',
                border: '1px solid #E0167A',
                padding: '3px 8px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            >
              Спецпоказ
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              background: 'rgba(255,255,255,0.06)',
              padding: '10px 12px',
              borderRadius: '12px',
              fontSize: '11px',
            }}
          >
            <div>
              <span style={{ color: '#8F7A93', display: 'block' }}>КИНОТЕАТР</span>
              <span style={{ fontWeight: 800 }}>Cinema City Eurovea</span>
            </div>
            <div>
              <span style={{ color: '#8F7A93', display: 'block' }}>ЗАЛ / МЕСТА</span>
              <span style={{ fontWeight: 800 }}>VIP • Ряд 5, 12-14</span>
            </div>
            <div>
              <span style={{ color: '#8F7A93', display: 'block' }}>ВКЛЮЧЕНО</span>
              <span style={{ fontWeight: 800 }}>Большой попкорн 🍿</span>
            </div>
            <div>
              <span style={{ color: '#8F7A93', display: 'block' }}>КОМПАНИЯ</span>
              <span style={{ fontWeight: 800 }}>Вся банда 🫶</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button to Download / Reveal */}
      <div style={{ width: '100%', maxWidth: '350px', zIndex: 2 }}>
        <button
          type="button"
          onClick={() => setIsPrankRevealed(true)}
          style={{
            width: '100%',
            background: '#E0167A',
            color: '#FFFFFF',
            border: '2px solid #1A1020',
            borderRadius: '999px',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 6px 0 #1A1020',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 0.1s ease',
          }}
        >
          <span>Скачать билет 🎟️</span>
        </button>
      </div>

      {/* ================= PRANK MODAL ================= */}
      {isPrankRevealed && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(26, 16, 32, 0.94)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '340px',
              background: '#FFD6EA',
              border: '3px solid #1A1020',
              borderRadius: '28px',
              padding: '28px 22px',
              textAlign: 'center',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div style={{ fontSize: '56px', lineHeight: 1 }} className="pulse">
              😈
            </div>

            <div
              style={{
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#E0167A',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1.5px solid #E0167A',
              }}
            >
              Пранк года
            </div>

            <h2
              className="font-playfair"
              style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: 900,
                fontStyle: 'italic',
                color: '#1A1020',
                lineHeight: 1.15,
              }}
            >
              ХА-ХА, ПОВЕРИЛ?! 😂
            </h2>

            <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#5C3A4E', lineHeight: 1.45 }}>
              Неужели ты правда думал, что мы подарим тебе обычный поход в кино на Голодные игры?!
            </p>

            <div
              style={{
                background: 'rgba(224, 22, 122, 0.1)',
                border: '1.5px dashed #E0167A',
                borderRadius: '16px',
                padding: '12px 14px',
                fontSize: '13px',
                fontWeight: 800,
                color: '#E0167A',
              }}
            >
              А теперь серьёзно... Пристегни ремни! ⚡🔥
            </div>

            <button
              type="button"
              onClick={async () => {
                try {
                  const DME = (window as any).DeviceMotionEvent;
                  if (typeof DME?.requestPermission === 'function') {
                    await DME.requestPermission();
                  }
                } catch (e) {
                  console.warn('Motion permission request error:', e);
                }
                onContinue();
              }}
              style={{
                width: '100%',
                background: '#E0167A',
                color: '#FFFFFF',
                border: '2px solid #1A1020',
                borderRadius: '999px',
                padding: '16px 20px',
                fontSize: '15px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 6px 0 #1A1020',
                marginTop: '6px',
              }}
            >
              Узнать НАСТОЯЩИЙ подарок ⚡
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

