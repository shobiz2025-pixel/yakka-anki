/**
 * 年度版管理 - 令和6年度 / 令和8年度の切り替え構造
 *
 * 現在の data.js, qa_text_01〜07.js は令和6年度版として扱う。
 * 令和8年度版は data/r08/ 配下に同一構造で配置することで切り替え可能。
 */
var VersionConfig = (function() {
  'use strict';

  var STORAGE_KEY = 'yakka_version';

  // 利用可能な年度版の定義
  var versions = {
    r06: {
      id: 'r06',
      label: '令和6年度版',
      year: 2024,
      qaDate: '令和6年3月29日',
      description: '令和6年度 薬価算定の基準',
      // データファイルのパス（index.html からの相対パス）
      dataFiles: {
        qaData: 'data.js',
        qaTexts: [
          'js/qa_text_01.js',
          'js/qa_text_02.js',
          'js/qa_text_03.js',
          'js/qa_text_04.js',
          'js/qa_text_05.js',
          'js/qa_text_06.js',
          'js/qa_text_07.js'
        ],
        qaTextIndex: 'js/qa_text_index.js',
        slidesDir: 'slides/'
      },
      // グローバル変数名
      globals: {
        qaData: 'QA_DATA',
        qaTextAll: 'QA_TEXT_ALL'
      }
    },
    r08: {
      id: 'r08',
      label: '令和8年度版',
      year: 2026,
      qaDate: '令和8年3月現在',
      description: '令和8年度 薬価算定の基準',
      dataFiles: {
        qaData: 'data/r08/data.js',
        qaTexts: [
          'js/qa_text_r8_01.js',
          'js/qa_text_r8_02.js',
          'js/qa_text_r8_03.js',
          'js/qa_text_r8_04.js',
          'js/qa_text_r8_05.js',
          'js/qa_text_r8_06.js',
          'js/qa_text_r8_07.js',
          'js/qa_text_r8_08.js'
        ],
        qaTextIndex: 'data/r08/qa_text_index.js',
        slidesDir: 'data/r08/slides/'
      },
      globals: {
        qaData: 'QA_DATA_R08',
        qaTextAll: 'QA_TEXT_ALL_R08'
      }
    }
  };

  function getCurrentVersionId() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'r08';
    } catch (e) {
      return 'r06';
    }
  }

  function setCurrentVersion(versionId) {
    if (!versions[versionId]) return false;
    try {
      localStorage.setItem(STORAGE_KEY, versionId);
    } catch (e) { /* ignore */ }
    return true;
  }

  function getCurrentVersion() {
    return versions[getCurrentVersionId()] || versions.r06;
  }

  function getAllVersions() {
    return Object.keys(versions).map(function(k) { return versions[k]; });
  }

  function isVersionReady(versionId) {
    var v = versions[versionId];
    if (!v) return false;
    // R06 は常にready（現在のデータ）
    if (versionId === 'r06') return true;
    // R08 は qaTextAll グローバル変数が存在するかチェック
    try {
      return typeof window[v.globals.qaTextAll] !== 'undefined';
    } catch (e) {
      return false;
    }
  }

  /**
   * 現在のバージョンに対応する QA_DATA を返す
   */
  function getQaData() {
    var v = getCurrentVersion();
    var data = window[v.globals.qaData];
    // データが存在し、かつ空でない場合のみ使用（空の場合は R06 にフォールバック）
    if (Array.isArray(data) && data.length > 0) return data;
    return typeof QA_DATA !== 'undefined' ? QA_DATA : [];
  }

  /**
   * 現在のバージョンに対応する QA_TEXT_ALL を返す
   */
  function getQaTextAll() {
    var v = getCurrentVersion();
    var texts = window[v.globals.qaTextAll];
    return (typeof texts === 'object' && texts !== null) ? texts : (typeof QA_TEXT_ALL !== 'undefined' ? QA_TEXT_ALL : {});
  }

  return {
    versions: versions,
    getCurrentVersionId: getCurrentVersionId,
    setCurrentVersion: setCurrentVersion,
    getCurrentVersion: getCurrentVersion,
    getAllVersions: getAllVersions,
    isVersionReady: isVersionReady,
    getQaData: getQaData,
    getQaTextAll: getQaTextAll
  };
})();
