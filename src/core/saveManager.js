(function(root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.createGameSaveManager = api.createGameSaveManager;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  function createGameSaveManager(storage, namespace = 'jujutsu-save') {
    function getKey(slot) {
      return `${namespace}-${slot}`;
    }

    function createChecksum(data) {
      const normalized = JSON.stringify(data);
      let hash = 0;
      for (let i = 0; i < normalized.length; i += 1) {
        hash = (hash << 5) - hash + normalized.charCodeAt(i);
        hash |= 0;
      }
      return `sha1-${Math.abs(hash).toString(16)}`;
    }

    function compressActionLog(logEntries) {
      return (logEntries || []).map((entry) => ({
        t: entry.timestamp ?? entry.t ?? 0,
        a: entry.type ?? entry.a ?? 'unknown',
        d: entry.data ?? entry.d ?? {}
      }));
    }

    function compressEventHistory(eventEntries) {
      return (eventEntries || []).map((entry) => ({
        t: entry.timestamp ?? entry.t ?? 0,
        e: entry.eventId ?? entry.e ?? 'unknown',
        o: entry.outcome ?? entry.o ?? 'unknown',
        d: entry.data ?? entry.d ?? {}
      }));
    }

    function saveState(slot, payload) {
      const envelope = {
        version: 1,
        savedAt: Date.now(),
        playtime: payload?.playtime ?? 0,
        checksum: '',
        payload: {
          ...payload,
          actionLog: compressActionLog(payload?.actionLog),
          eventHistory: compressEventHistory(payload?.eventHistory)
        }
      };

      envelope.checksum = createChecksum({
        version: envelope.version,
        savedAt: envelope.savedAt,
        playtime: envelope.playtime,
        payload: envelope.payload
      });

      storage.setItem(getKey(slot), JSON.stringify(envelope));
      return envelope;
    }

    function loadState(slot) {
      const raw = storage.getItem(getKey(slot));
      if (!raw) {
        return null;
      }

      try {
        const parsed = JSON.parse(raw);
        if (!parsed || parsed.version !== 1 || !Object.prototype.hasOwnProperty.call(parsed, 'payload')) {
          return null;
        }

        const expectedChecksum = createChecksum({
          version: parsed.version,
          savedAt: parsed.savedAt,
          playtime: parsed.playtime,
          payload: parsed.payload
        });

        if (parsed.checksum !== expectedChecksum) {
          return null;
        }

        return parsed.payload;
      } catch (error) {
        return null;
      }
    }

    function clearState(slot) {
      storage.removeItem(getKey(slot));
    }

    return {
      saveState,
      loadState,
      clearState
    };
  }

  return {
    createGameSaveManager
  };
});
