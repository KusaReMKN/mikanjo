'use strict';

form_hoge.addEventListener('submit', e => e.preventDefault());

async function
calcHash(data, algo = 'SHA-256')
{
	const encoder = new TextEncoder();
	const dataBuf = encoder.encode(data);
	const hash    = await crypto.subtle.digest(algo, dataBuf);
	const hashBuf = new Uint8Array(hash);
	return hashBuf.toHex();
}
btn_hpc.addEventListener('click', async e => {
	btn_hpc.disabled = true;
	txt_hpc.value = await calcHash(txt_pc.value);
	btn_hpc.disabled = false;
});
btn_hpm.addEventListener('click', async e => {
	btn_hpm.disabled = true;
	txt_hpm.value = await calcHash(txt_pm.value);
	btn_hpm.disabled = false;
});

btn_rand.addEventListener('click', async e => {
	btn_rand.disabled = true;
	const hpc = await calcHash(txt_pc.value);
	if (hpc !== txt_hpc.value) {
		txt_rand.value = '請求する側の秘密の値のハッシュ値が一致しません';
		btn_rand.disabled = false;
		return;
	}
	const hpm = await calcHash(txt_pm.value);
	if (hpm !== txt_hpm.value) {
		txt_rand.value = '請求される側の秘密の値のハッシュ値が一致しません';
		btn_rand.disabled = false;
		return;
	}
	txt_rand.value = await calcHash(txt_pc.value + txt_pm.value);
	btn_rand.disabled = false;
});

btn_round.addEventListener('click', e => {
	const buf = Uint8Array.fromHex(txt_rand.value);
	txt_round.value = buf.reduce((s, e) => s + e, 0) / buf.length / 256;
});
