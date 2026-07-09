import { spawnSync } from 'node:child_process';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', ...options });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function getGitOutput(args) {
  return spawnSync('git', args, { encoding: 'utf8' });
}

run('panda', ['codegen'], { shell: process.platform === 'win32' });

const shallowCheck = getGitOutput(['rev-parse', '--is-shallow-repository']);

if (shallowCheck.status !== 0) {
  process.exit(shallowCheck.status ?? 1);
}

// GitHub Actions の shallow clone では、記事更新日の算出に使う gitlog が
// 過去コミットを読めるように履歴を取得する。一方、ローカルや fetch-depth: 0 の
// checkout は既に完全なリポジトリなので --unshallow を実行すると失敗する。
// 事前に shallow かどうかを判定して、環境差で prepare が落ちるのを避ける。
if (shallowCheck.stdout.trim() === 'true') {
  run('git', ['fetch', '--unshallow']);
}
