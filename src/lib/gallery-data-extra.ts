
import type { GalleryItem, GalleryFair, GalleryTheme } from './types';

// Lote 2: Contém as URLs da galeria a partir do item 251.
const allItemUrls: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_32_inhame_aranha.mp4?alt=media&token=3c61b9ac-bf2a-433c-b8c8-570fe1144cc2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_35_robinete.mp4?alt=media&token=3aed7d59-3109-4788-b6d8-2aedb3d820cd',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_37_sporock.mp4?alt=media&token=45b2b6af-c42e-428c-a223-31f48f241951',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_40_aqualface.mp4?alt=media&token=ef12d21a-fed1-4faf-a85b-23877cef7f3f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_45_uva_negra.mp4?alt=media&token=abc0ef6f-f505-459d-b0f7-8f252e82f2b7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_47_coisa_de_milho.mp4?alt=media&token=c1f5e623-e814-4207-9547-f464dbc6e6c0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_48_limao_america.mp4?alt=media&token=8f642654-b5f9-4d4e-a325-56fc749affdb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_51_uverine.mp4?alt=media&token=a1b85d0c-0eea-4cdf-914f-486514a413e6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_53_berinjela_negra.mp4?alt=media&token=d1e7cb31-e71c-4819-a3f5-0c8a0aab6364',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_54_brulk.mp4?alt=media&token=7cb17004-b13e-4cde-8d27-79c9b6969bf5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_57_mandiorpheus.mp4?alt=media&token=55fd756b-0ebd-48e5-bca2-28d6dd409ac7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_58_abobrinha_maravilha.mp4?alt=media&token=16a3e5de-d57d-450e-ad11-21cc65adb5e1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_62_pepino_verde.mp4?alt=media&token=3dbf4bb7-bc97-40bd-ad6f-8a7a3defb2ed',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_73_beterraba_de_ferro.mp4?alt=media&token=2a029c77-86da-4bcb-8dd1-f283e7dcd2cb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_30_batatman.mp4?alt=media&token=64961140-c13b-4b43-b7fd-e3c087b3fda0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_31_inhame_aranha.mp4?alt=media&token=b786e600-78aa-476c-b02e-5fda5b6ae864',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_32_sporock.mp4?alt=media&token=8b9e2e97-ee65-4ba9-879b-762e63a98288',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_34_aqualface.mp4?alt=media&token=7e57f3b4-db37-41b3-b71c-1ecc72d0ea49',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_37_robinete.mp4?alt=media&token=d1c6b0b7-b35a-4be7-960c-cfe5836faf04',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_41_uva_negra.mp4?alt=media&token=94830cb3-1ffd-48a0-ac08-bc4cb28caf87',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_43_coisa_de_milho.mp4?alt=media&token=ed8ecd95-add1-49c3-abf2-8f06e3144ebb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_46_limao_america.mp4?alt=media&token=d96c632e-04eb-4232-af1c-fb519c864e88',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_48_uverine.mp4?alt=media&token=4a067b3b-99f4-421d-86c8-9030e41b1cbc',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_49_berinjela_negra.mp4?alt=media&token=d039c9f3-4540-4a1f-980f-d9579da9a8c1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_52_brulk.mp4?alt=media&token=ea5aff65-a165-410d-947a-ceada4f9bf10',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_54_mandiorpheus.mp4?alt=media&token=9489dd3c-627f-444f-8a36-2b77d4a08cf0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_55_abobrinha_maravilha.mp4?alt=media&token=03afdf8a-1fc9-4525-a0a8-b4977d476c25',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_72_beterraba_de_ferro.mp4?alt=media&token=dffc16db-fc81-43ac-bfc7-867360ce3923',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_83_pepino_verde.mp4?alt=media&token=d53da7b0-0394-4a87-bc89-da1c1617c50d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_48_batatman.mp4?alt=media&token=b294d6aa-3bc5-444e-9887-602c546b901b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_49_inhame_aranha.mp4?alt=media&token=806d4f89-478f-447f-a1b9-f56a11c70adb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_52_robinete.mp4?alt=media&token=d22a3e62-056e-4e0e-ac0a-a1d484f4093a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_54_sporock.mp4?alt=media&token=3d4055cf-76d2-45e4-a62a-a1c553b78ca8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_57_aqualface.mp4?alt=media&token=e41f3c31-8497-401f-8fe2-982ed1077501',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_61_uva_negra.mp4?alt=media&token=c03748c9-20b7-45d2-a481-91da4ad879a1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_63_coisa_de_milho.mp4?alt=media&token=5df59f3d-73b8-4329-b28a-c0aabd7a38b5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_66_limao_america.mp4?alt=media&token=4db398b0-b3d6-4ea1-80de-b64bf18aeac9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_68_uverine.mp4?alt=media&token=5a60387d-2326-4e17-a5ff-e4bd45602f02',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_69_berinjela_negra.mp4?alt=media&token=bcdf44e0-5bc5-4646-9379-caf271254a04',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_71_brulk.mp4?alt=media&token=ab21e3a9-38d5-4d5a-82d0-d5f51839e53c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_74_mandiorpheus.mp4?alt=media&token=929cebd8-b86a-4bc1-b866-9b995315d36f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_75_abobrinha_maravilha.mp4?alt=media&token=00645545-1ab5-43af-91c9-150f884b1519',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_76_abobrinha_maravilha.png?alt=media&token=8d154ca5-30dc-4c43-ab29-c32fd7d27fff',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_80_pepino_verde.mp4?alt=media&token=a2e427e8-7c74-4957-8fe7-32898c98057d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_91_beterraba_de_ferro.mp4?alt=media&token=79cfaddf-d0c0-48fb-9480-0787d66ac5d9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_36_bata.png?alt=media&token=20e18dcb-b7f0-410a-922b-a98a9ab2d985',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_38_robin.png?alt=media&token=526e91d5-bf81-46e6-9d66-e9efa84d4807',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_44_sporock.png?alt=media&token=43001901-4292-4d29-bd47-edb5897cca89',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_45_inhame.png?alt=media&token=fdd03fd9-4461-4561-9a67-304ab8aeee55',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_48_uva.png?alt=media&token=a65368aa-dec7-471a-a6e7-e06fd1582154',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_49_limao.png?alt=media&token=d293f76c-464c-4d1b-8015-303f146aaaf6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_52_uverine.png?alt=media&token=658030d2-6d5f-4032-9d14-844f75a6500a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_53_berinjela.png?alt=media&token=8660ef0a-313d-4c31-bc6e-b3d9571ff74c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_56_brulk.png?alt=media&token=e937d579-dd27-4de7-9109-7d08c5c7d812',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_59_mandiorpheus.png?alt=media&token=963be6ed-d7c7-4581-9b0d-b472097e3c9c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_60_abobrinha.png?alt=media&token=3b924de7-a169-4e00-a0aa-50b8655c68ab',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_61_pepino.png?alt=media&token=09c4d9fa-47d3-469b-8e18-f0761e1b8b8d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_69_beterraba.png?alt=media&token=e02462e4-1815-4ca3-b8e7-ac0b91d9cc12',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feira_botafogo_18_joaninha.png?alt=media&token=eb949021-36f0-466a-b286-9ac7ed4e019c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_76_abobrinha_maravilha.png?alt=media&token=8d154ca5-30dc-4c43-ab29-c32fd7d27fff',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_80_pepino_verde.mp4?alt=media&token=a2e427e8-7c74-4957-8fe7-32898c98057d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_91_beterraba_de_ferro.mp4?alt=media&token=79cfaddf-d0c0-48fb-9480-0787d66ac5d9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_32_batatman.mp4?alt=media&token=e5105a98-3287-4ffe-9818-797b1a624220',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_33_Inhame_aranha.mp4?alt=media&token=1a9ddd79-96b9-43f7-bba7-aaa96b768775',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_34_sporock.mp4?alt=media&token=d111b5e0-494c-4cd1-abac-dbeb3b9d79fb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_37_aqualface.mp4?alt=media&token=926d8fdf-b7e6-48da-b5c9-c4e9f5a94a3c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_41_robinete.mp4?alt=media&token=1691c276-afbb-4a9f-985d-d08b605baf6d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_45_uva_negra.mp4?alt=media&token=27e54a78-560e-44e3-baa7-2aef1d5b647d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_47_coisa_de_milho.mp4?alt=media&token=e40bb5f9-cebc-4774-ac51-67a48c555dcc',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_50_limao_america.mp4?alt=media&token=050a78ee-7a7f-414f-887a-b9f95db1ae3e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_52_uverine.mp4?alt=media&token=46963e56-610d-46cc-a901-b013e28c530f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_53_berinjela_negra.mp4?alt=media&token=6e86a4ed-a0b4-436b-b924-4a5ece394ed9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_56_brulk.mp4?alt=media&token=495ad525-2254-4de1-94fa-05724014e1b5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_58_mandiorpheus.mp4?alt=media&token=1695a7c2-bc7b-4160-acc4-5efc5b27dd98',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_59_abobrinha_maravilha.mp4?alt=media&token=9ae1343f-fa88-4afd-b561-a36c0463282e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_63_pepino_verde.mp4?alt=media&token=6a9065d8-9de8-48a6-8b23-18ed0456edfb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_botafogo_76_beterraba_de_ferro.mp4?alt=media&token=71612028-2518-4f71-b62a-743a52626abb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_31_batatman.mp4?alt=media&token=553bcd2c-faee-4863-812f-ce99c0d432cf',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_10a.jpg?alt=media&token=04867325-bff0-4e2d-a18a-3eedcd98cae7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_100_feiras_flamengo_laranjeiras.png?alt=media&token=91ea86db-096f-4a19-b23b-21554960e9b0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_101_feiras_flamengo_laranjeiras.png?alt=media&token=a91e2c0f-3af0-4532-941d-f1d7d4b94d7c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_104_feiras_flamengo_laranjeiras.png?alt=media&token=9645ed01-1b76-4e27-85c5-dcd5f518745f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_104_todas_feiras.png?alt=media&token=33d6ff96-1419-4605-89a6-bb5bc623854f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_105_feiras_flamengo_laranjeiras.png?alt=media&token=28ba7cae-3e5a-4c30-8453-8998ef421160',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_105_todas_feiras.png?alt=media&token=f81cd7b8-7341-453b-9d25-315ab25f12d2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_106_feiras_flamengo_laranjeiras.png?alt=media&token=ea662e40-ce90-4943-87a3-b22042138950'
];

function getFairCategories(fileName: string): GalleryFair[] {
    const fairs: GalleryFair[] = [];
    if (fileName.includes('todas_feiras')) fairs.push('Todas');
    if (fileName.includes('feiras_flamengo_laranjeiras')) fairs.push('Flamengo e Laranjeiras');
    if (fileName.includes('feira_grajau')) fairs.push('Grajaú');
    if (fileName.includes('feira_tijuca')) fairs.push('Tijuca');
    if (fileName.includes('feira_botafogo')) fairs.push('Botafogo');
    if (fileName.includes('feira_leme')) fairs.push('Leme');
    
    if (fairs.length === 0) fairs.push('Todas');
    return fairs;
}

function getThemeCategories(fileName: string): GalleryTheme[] {
    const themes: GalleryTheme[] = [];
    if (fileName.startsWith('fot')) themes.push('Fotografias');
    if (fileName.startsWith('aagr')) themes.push('Agricultores - Animações e Cartoon');
    if (fileName.startsWith('aali')) themes.push('Alimentos - Animações e Cartoon');
    if (fileName.startsWith('ap_')) themes.push('Personagens - Animações e Cartoon');
    if (fileName.includes('story')) themes.push('Story');
    if (fileName.includes('especial')) themes.push('Dias Especiais');

    if (themes.length === 0) {
        if (fileName.endsWith('.mp4')) {
            themes.push('Agricultores - Animações e Cartoon');
        } else {
             themes.push('Fotografias');
        }
    }
    return themes;
}

function extractFileNameFromUrl(url: string): string {
    try {
        const decodedUrl = decodeURIComponent(url);
        const path = new URL(decodedUrl).pathname;
        const parts = path.split('/');
        return parts[parts.length - 1].split('?')[0];
    } catch (e) {
        const lastSlashIndex = url.lastIndexOf('%2F');
        const questionMarkIndex = url.indexOf('?');
        if (lastSlashIndex !== -1) {
            const end = questionMarkIndex > -1 ? questionMarkIndex : url.length;
            return decodeURIComponent(url.substring(lastSlashIndex + 3, end));
        }
        return `arquivo-${Math.random()}`;
    }
}

export function getExtraGalleryItems(): GalleryItem[] {
  return allItemUrls.map((url, index) => {
    const fileName = extractFileNameFromUrl(url);
    const id = `extra-item-${index}-${fileName.split('.')[0]}`;
    
    let title = fileName
      .replace(/_/g, ' ')
      .replace(/\.(jpg|png|mp4|jpeg)$/i, '');

    const parts = title.split(' ');
    if (parts.length > 2 && /^\d+$/.test(parts[1])) {
        title = parts.slice(2).join(' ');
    }
     if (/^\d+$/.test(parts[0])) {
        title = parts.slice(1).join(' ');
    }

    title = title
        .replace(/ feira(s)? (de|do|da)? (grajau|tijuca|botafogo|leme|flamengo|laranjeiras|todas)/gi, '')
        .replace(/feiras flamengo laranjeiras/gi, '')
        .replace(/\b\w/g, l => l.toUpperCase());

    const type = fileName.endsWith('.mp4') ? 'video' : 'image';
    const dataAiHint = title.toLowerCase().split(' ').slice(0, 2).join(' ');

    return {
      id,
      url,
      title,
      type,
      dataAiHint,
      fair: getFairCategories(fileName),
      theme: getThemeCategories(fileName),
    };
  });
}
