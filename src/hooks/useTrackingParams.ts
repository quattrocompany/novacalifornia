'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export function useTrackingParams() {
  const searchParams = useSearchParams();
  
  const [trackingData, setTrackingData] = useState({
    source: '',
    medium: '',
    campaign: '',
    content: '',
    term: '',
    gclid: '',
    gbraid: '',
    wbraid: '',
  });

  useEffect(() => {
    // 1. Extrai os parâmetros da URL atual
    const currentParams = {
      source: searchParams.get('utm_source') || '',
      medium: searchParams.get('utm_medium') || '',
      campaign: searchParams.get('utm_campaign') || '',
      content: searchParams.get('utm_content') || '',
      term: searchParams.get('utm_term') || '',
      gclid: searchParams.get('gclid') || '',
      gbraid: searchParams.get('gbraid') || '',
      wbraid: searchParams.get('wbraid') || '',
    };

    // 2. Verifica se a URL trouxe algum parâmetro válido
    const hasParams = Object.values(currentParams).some((val) => val !== '');

    if (hasParams) {
      // Se tiver parâmetros, salva no sessionStorage específico do Nova Califórnia
      sessionStorage.setItem('nova_california_tracking', JSON.stringify(currentParams));
      setTrackingData(currentParams);
    } else {
      // Se não tiver (ex: usuário navegou para outra página interna), tenta recuperar os salvos
      const savedTracking = sessionStorage.getItem('nova_california_tracking');
      if (savedTracking) {
        try {
          setTrackingData(JSON.parse(savedTracking));
        } catch (e) {
          console.error('Erro ao recuperar tracking do sessionStorage:', e);
        }
      }
    }
  }, [searchParams]);

  return trackingData;
}