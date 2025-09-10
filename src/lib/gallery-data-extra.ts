
import type { GalleryItem, GalleryFair, GalleryTheme } from './types';

// Lote 2: Contém as URLs da galeria a partir do item 251.
const allItemUrls: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_03.jpg?alt=media&token=eea2f616-5285-40ce-9e05-bb2be3aa8d9b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_03a.jpg?alt=media&token=c9ef1937-3e34-4b1f-8e09-1270491cc69c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_04.jpg?alt=media&token=306c8efd-d544-4283-a06d-e69ea78b77bb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_04a.png?alt=media&token=56eb3966-ed22-41b4-89e2-0d8b11f60a5d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_05.jpg?alt=media&token=eab791d1-4a1a-42e8-b84d-1ff8768da672',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_05a.jpg?alt=media&token=5934a0bb-7a8a-4c9b-a4c8-fb5a2b1cff68',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_06.jpg?alt=media&token=1f6d9fc7-df77-400c-9401-fd8b5fddf81a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_06a.jpg?alt=media&token=23eacb2d-4a81-4514-b7dd-49a3f974d4d5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_07.jpg?alt=media&token=32184c51-723b-41e2-8bd7-36307eec316d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_07a.jpg?alt=media&token=6cde3804-c774-4ba7-bb3c-659e75ea8b5e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_08.jpg?alt=media&token=f144d7bc-72e5-4066-b0e7-d254acc8ceda',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_08a.jpg?alt=media&token=724a63b2-9ea1-4497-bf8b-6b413669c957',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_09.jpg?alt=media&token=1f785f0e-0995-4f4e-b922-c176ccf0844f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_09a.jpg?alt=media&token=a5a42437-792d-43ba-8dac-735f51d851c7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_10.jpg?alt=media&token=ba4f5d34-e2c2-4dea-ba86-efdd9fe4e845',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fespecial_dia_das_maes_10a.jpg?alt=media&token=04867325-bff0-4e2d-a18a-3eedcd98cae7',
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
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_leme_31_inhame_aranha.mp4?alt=media&token=b786e600-78aa-476c-b02e-5fda5b881864',
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
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_100_feiras_flamengo_laranjeiras.png?alt=media&token=91ea86db-096f-4a19-b23b-21554960e9b0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_101_feiras_flamengo_laranjeiras.png?alt=media&token=a91e2c0f-3af0-4532-941d-f1d7d4b94d7c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_104_feiras_flamengo_laranjeiras.png?alt=media&token=9645ed01-1b76-4e27-85c5-dcd5f518745f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_104_todas_feiras.png?alt=media&token=33d6ff96-1419-4605-89a6-bb5bc623854f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_105_feiras_flamengo_laranjeiras.png?alt=media&token=28ba7cae-3e5a-4c30-8453-8998ef421160',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_105_todas_feiras.png?alt=media&token=f81cd7b8-7341-453b-9d25-315ab25f12d2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_106_todas_feiras.png?alt=media&token=2878e890-ced7-4d06-953e-79bf347d5ee1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_16_feira_grajau.png?alt=media&token=3f092fbe-dfad-4a55-b341-447b0331bdb1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_feira_botafogo.png?alt=media&token=0f21f6fe-99b4-4681-ab29-4a4c00f7424b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_feira_grajau.png?alt=media&token=33cfad97-7e6a-4615-b43a-0f4543c2bd5e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_feira_leme.png?alt=media&token=4c1d7ef5-8402-4bcc-ad7c-ba5a92c14249',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_todas_feiras.png?alt=media&token=c43cccf1-d6c5-47d9-81b8-41f9da4cf8da',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_18_feira_botafogo.png?alt=media&token=0a2a9081-5a5b-461c-80f3-34c1301b9135',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_18_feira_leme.png?alt=media&token=78f550ee-60a5-4bad-b032-393c7cc601d5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_19_feira_grajau.png?alt=media&token=ee63d15d-48b5-4b7b-9c63-5f81e2b6ee27',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_19_feira_tijuca.png?alt=media&token=4e260f86-df2f-48ce-b2b7-fb4392238c78',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_20_feira_botafogo.png?alt=media&token=80b3b03e-47ed-429f-b627-d5b96173d193',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_20_feira_leme.png?alt=media&token=bdb52e1c-825d-4376-ac8b-a3ff89ffc2b5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_20_feira_tijuca.png?alt=media&token=03b7cf6a-1a44-4ce7-8124-a226d015e744',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_21_feira_grajau.png?alt=media&token=5c211af7-9160-4daf-9f4f-4519da582ce1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_22_feira_botafogo.png?alt=media&token=77e3ae70-2104-408b-9a81-ec93e1d85fef',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_22_feira_leme.png?alt=media&token=a446e764-afce-4bf7-8f68-57c7389b0723',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_feira_tijuca.png?alt=media&token=832130cc-aa17-4c9c-8831-65ce5afa6f7e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_feiras_flamengo_laranjeiras.png?alt=media&token=0ac5b001-8917-45c3-948e-3e2df672a4c8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_todas_feiras.png?alt=media&token=c1041860-0b95-4c20-b2b0-92de0997b0e6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_26_feira_tijuca.png?alt=media&token=87d284bb-fcb4-45a3-bf78-22df26b61fa2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_26_todas_feiras.png?alt=media&token=8378bf23-e5e8-4ff5-b281-b23d3bfb216d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_28_feiras_flamengo_laranjeiras.png?alt=media&token=43e62ab2-c4ce-4932-9d9a-e260d5265421',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_29_feiras_flamengo_laranjeiras.png?alt=media&token=0d51bbb2-3781-4828-a305-83b990b948f4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_30_feiras_flamengo_laranjeiras.png?alt=media&token=fd137203-7560-41f7-ae15-214a993bbe75',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_30_todas_feiras.png?alt=media&token=5a072510-7284-417c-aedd-42a3ca69f515',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_33_feira_leme.png?alt=media&token=d3a206f5-7bbf-481b-945c-e46d7c26a63c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_34_feira_leme.png?alt=media&token=39186704-821e-4fb3-87b7-f85198a1b926',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_35_feira_botafogo.png?alt=media&token=2f43b48e-c15a-45bf-84ba-ddeb51b6dc82',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_36_feira_botafogo.png?alt=media&token=2ed40f88-cdb7-4c82-917b-79971cfadeb2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_38_feira_grajau.png?alt=media&token=fdb54153-614c-45ff-911e-2ef4a54c00e6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_39_feira_grajau.png?alt=media&token=62d8a24c-2cc2-4298-ab02-23febf906d65',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_43_feira_grajau.png?alt=media&token=2618e58e-f390-429b-a9fe-c7cf606e5f15',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_44_feira_botafogo.png?alt=media&token=67a8c528-9944-44b1-9d1a-b5c34572c8e0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_44_todas_feiras.png?alt=media&token=4bfa1f1c-3479-46e5-88b6-ed790c86606a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_55_feira_tijuca.png?alt=media&token=30c8642d-e2a0-4430-a7a6-c66a0f12616f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_55_todas_feiras.png?alt=media&token=4b6ef0ae-b017-467a-b72f-ea40a277fb43',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_56_feira_tijuca.png?alt=media&token=9f6e3d53-a3cc-4a77-926d-10788562a49b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_56_todas_feiras.png?alt=media&token=9e875aaa-d576-4a70-acb8-5fcdccd25898',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_57_todas_feiras.png?alt=media&token=f86b0654-4dda-4dd5-88fc-1bc030bb8bc4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_60_feira_tijuca.png?alt=media&token=8dd9da8a-fbd5-4da9-838a-566628fbfab9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_61_todas_feiras.png?alt=media&token=a883548a-dbad-40a2-9cc9-da194b5e2ecb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_62_feira_leme.png?alt=media&token=5a1487b2-f1ac-4665-8901-f38b8720e91a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_65_feira_leme.png?alt=media&token=e20da07f-bf42-4f71-9a40-da26da41b3f5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_66_feira_grajau.png?alt=media&token=2c7c0ac5-519b-41de-beeb-178f89500e3c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_66_feira_leme.png?alt=media&token=619446c3-a087-4e41-b5b3-9fb08841350c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_67_feira_grajau.png?alt=media&token=8daafee3-3349-4f48-8687-a59ba603216d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_67_feira_leme.png?alt=media&token=738d5659-6b00-48da-bb0b-043a68549810',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_67_todas_feiras.png?alt=media&token=3c3a9011-7475-4b4f-a85a-59cb8b95d904',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_68_feira_grajau.png?alt=media&token=22bfcdaf-cce8-421e-9f6e-de831066d094',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_68_feira_leme.png?alt=media&token=e854aabb-599b-4779-8404-cc97db382795',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_69_feira_botafogo.png?alt=media&token=3571b9b9-73eb-45ce-b4f7-fb19b5e59035',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_69_feira_grajau.png?alt=media&token=9c3567ca-37fd-488e-b443-34eedcd43c4c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_69_feira_leme.png?alt=media&token=dbfbc3fb-f80a-416e-b56d-7ef2a30b3892',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_70_feira_botafogo.png?alt=media&token=e4d7462d-5785-4e10-be6a-040a43a11d3a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_70_feira_grajau.png?alt=media&token=8c767e49-e87e-49ec-9002-da72b2677fd1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_70_feira_leme.png?alt=media&token=aab42b41-491b-4f39-b4ca-93ab306ab49c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_71_feira_botafogo.png?alt=media&token=e8618e7b-e9a0-46fc-975f-8959ce2aa670',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_71_feira_grajau.png?alt=media&token=7414e23d-cab1-49a4-9845-981358520a98',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_71_feira_leme.png?alt=media&token=19aab830-4428-4f90-985c-7ddc47fddfe4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_72_feira_botafogo.png?alt=media&token=917b4fe6-3586-4cec-87fb-4cec22106f72',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_72_feira_grajau.png?alt=media&token=6dac860e-44ff-469b-810d-d34c6fb4b3de',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_73_feira_botafogo.png?alt=media&token=615fe4fb-6502-451a-b578-df860be6e04c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_74_feira_botafogo.png?alt=media&token=fd2ae21c-ea12-45be-b9b3-918fb3d2f719',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_74_feira_leme.png?alt=media&token=e7a0607d-45da-44fe-be6e-a305d5a14720',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_75_feira_botafogo.png?alt=media&token=0ab97dff-2cd6-47c9-8a31-0d7604f0718b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_75_feira_grajau.png?alt=media&token=03b0cf01-8e15-4565-9ea8-b95a50949a1e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_75_feira_leme.png?alt=media&token=4328619a-7162-4fd6-adf7-62893d8267fb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_76_feira_grajau.png?alt=media&token=86fd1688-064d-46f8-bd54-e6a02d815e32',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_76_feira_leme.png?alt=media&token=a724d52d-cc6d-48d3-a78c-bf13bdca24c8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_77_feira_grajau.png?alt=media&token=395bb517-d364-481c-8d79-3185d3c701e9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_78_feira_botafogo.png?alt=media&token=2bd0d260-62f6-4e4d-82a7-6398ea5cf8f8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_79_feira_botafogo.png?alt=media&token=546d2869-64a7-4c75-90d4-849de10209c3',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_80_feira_botafogo.png?alt=media&token=1711da43-cfe5-49df-84be-6d2a7c058a36',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_83_feiras_flamengo_laranjeiras.png?alt=media&token=a35b8b74-f1b0-4720-a812-14e2c6ac2a42',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_84_feira_tijuca.png?alt=media&token=b917b926-b18e-47a0-8a7e-5b7f5f330ca9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_84_feiras_flamengo_laranjeiras.png?alt=media&token=f052a68b-1edc-425e-9abd-8db6472e4883',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_85_feira_tijuca.png?alt=media&token=1ac6fe57-cd40-4eb4-8ef2-976553fb0df8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_85_feiras_flamengo_laranjeiras.png?alt=media&token=2db403c1-c96b-4bb2-90e6-7611eafe6484',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_86_feira_tijuca.png?alt=media&token=763116d2-7de6-4820-9d99-c766ec4b43aa',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_87_feira_tijuca.png?alt=media&token=61bb8d0a-2fef-4976-bbc2-70feacf5afaa',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_87_feiras_flamengo_laranjeiras.png?alt=media&token=a14a4194-9342-4ece-9282-b0fccf353bee',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_87_todas_feiras.png?alt=media&token=1dbc620b-c1ef-493c-88cc-bbc655ef4a82',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_88_feira_tijuca.png?alt=media&token=34f98bc7-9df9-496b-9906-7832631d7bce',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_88_feiras_flamengo_laranjeiras.png?alt=media&token=d21bc3be-d6a4-4066-a0f1-f84fe015fbf4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_88_todas_feiras.png?alt=media&token=85ca053a-d91d-40a9-8d2f-86254194ed17',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_89_feira_tijuca.png?alt=media&token=8271db31-fe68-44a5-b7a2-fffd5099e8d5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_89_todas_feiras.png?alt=media&token=f5ecb791-8cc5-41db-9f36-ddee2814ac3f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_90_feira_tijuca.png?alt=media&token=6713f0ea-e6ea-4d4e-baa6-2752c96629a1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_90_todas_feiras.png?alt=media&token=b46ce33e-9f8f-48e8-9f57-e5373807d9c5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_93_feira_tijuca.png?alt=media&token=b81cf871-963a-43cc-8d18-37ffadd120cd',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_93_feiras_flamengo_laranjeiras.png?alt=media&token=7e9bd07a-f9e2-4558-8d36-e5e8d8b295d1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_94_feira_tijuca.png?alt=media&token=4b6675af-13d8-4bac-b090-d75c0d2e3ad4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_95_feira_tijuca.png?alt=media&token=dec2b9e4-c43a-465a-8bc9-1e1814e5ae92',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_98_feiras_flamengo_laranjeiras.png?alt=media&token=95ca9421-86a0-4627-a63b-f114388f13af',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_99_feiras_flamengo_laranjeiras.png?alt=media&token=3c8d1c6a-6774-4994-90be-3df101244507',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_01_feira_grajau.png?alt=media&token=6e8216ea-9247-43a7-8363-743eb046d1aa',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_02_feira_tijuca.png?alt=media&token=13cc260e-0264-4610-8c4d-32b5e45eeee5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_03_feira_leme.png?alt=media&token=82275657-8da7-44a5-b537-c64b245b77b8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_04_feiras_flamengo_laranjeiras.png?alt=media&token=ba9cca46-b2e6-4bc1-bc78-0450851fe69c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_05_todas_feiras.png?alt=media&token=e32fa679-364f-461f-b10b-b249637c6af7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_06_feira_botafogo.png?alt=media&token=0ccb0f94-0abc-404c-9a99-b3d2befd4230',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_07_feiras_flamengo_laranjeiras.png?alt=media&token=9fd03b83-8db6-459f-815c-727cde5bb5db',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_08_feira_grajau.png?alt=media&token=a7ebb549-dc56-426b-be97-81078b6ee18e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_09_feira_tijuca.png?alt=media&token=1a6c1288-cc77-4467-ab2e-1252bd2c524f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_10_feira_botafogo.png?alt=media&token=53f72ddf-d829-4f77-9833-8660ef973d72',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_11_feira_leme.png?alt=media&token=967f6e39-8a8a-4c6c-9856-3f12ade1d6c1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_12_todas_feiras.png?alt=media&token=de487e97-0c48-4349-bf43-6a8112900d59',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_06_feiras_flamengo_laranjeiras.png?alt=media&token=13944fa6-03c1-424c-b727-f843485f6f22',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_07_todas_feiras.png?alt=media&token=0c6bea03-3935-4639-a0e3-9bcbd33cf808',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_08_todas_feiras.png?alt=media&token=56c2eda9-daac-4693-904e-b2cc6996e235',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_100_todas_feiras.png?alt=media&token=db59ef83-a38d-431a-80fc-a1f2060295b4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_101_feiras_flamengo_laranjeiras.png?alt=media&token=ba12cd57-2f7f-474b-beb4-3efed5c9de0b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_105_feiras_flamengo_laranjeiras.png?alt=media&token=2c6bb5e8-3702-40f0-88d6-dcfc30c80ac8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_106_todas_feiras.png?alt=media&token=49a11a3c-095a-47fa-ab16-d0085a31c810',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_107_feiras_flamengo_laranjeiras.png?alt=media&token=e6d6067a-0643-481e-98bc-35be29e2d154',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_108_todas_feiras.png?alt=media&token=ac2d9ba2-3c3b-4ed4-80b7-a849bdade9b9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_109_feiras_flamengo_laranjeiras.png?alt=media&token=92168ec7-2a24-46a4-9e45-218b750b4cfe',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_10_feiras_flamengo_laranjeiras.png?alt=media&token=9d4c61d5-b6fd-4be9-acc5-38c3376ee42a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_110_todas_feiras.png?alt=media&token=968d83ff-7a59-4c1f-beaf-15b2e60151da',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_43_todas_feiras.png?alt=media&token=02a1bed4-63a1-4810-9eb2-3013dec3f1c7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_51_feiras_flamengo_laranjeiras.png?alt=media&token=b828b911-6e83-469d-8ec7-ee97da5773ef',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_55_feiras_flamengo_laranjeiras.png?alt=media&token=41336d51-1cfa-43d1-b809-4a65e921ce83',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_56_feiras_flamengo_laranjeiras.png?alt=media&token=563926dd-3bdf-458e-b93e-a7ed58ce9d97',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_58_todas_feiras.png?alt=media&token=ea00d11e-45c4-4023-be1e-d5f473b3a36b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_59_todas_feiras.png?alt=media&token=9025e448-562a-47ea-ae55-d9ed24e2a8b1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_69_todas_feiras.png?alt=media&token=cce76e39-615e-42cb-bb98-f5c0633e5ccf',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_81_feiras_flamengo_laranjeiras.png?alt=media&token=6e5361e3-2bb1-4a98-a071-70ff578e979b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_86_feiras_flamengo_laranjeiras.png?alt=media&token=02ea7dc9-1ae6-4740-9b31-5940b7e1beec',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_87_todas_feiras.png?alt=media&token=8d29edf1-4171-4171-932e-31e8a40210a0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_88_feiras_flamengo_laranjeiras.png?alt=media&token=ae312598-6b6b-414d-84d9-c3407ecbe77b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_89_todas_feiras.png?alt=media&token=284c5a20-5902-4c10-9857-7a157819368e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_90_todas_feiras.png?alt=media&token=99fbb7cc-5d25-4b4e-ae45-89490c18e636',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_91_feiras_flamengo_laranjeiras.png?alt=media&token=d7068ec0-b70f-4ae3-8204-5fdf7eba2399',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_92_feiras_flamengo_laranjeiras.png?alt=media&token=48b88133-d10d-43ee-b9f4-5c3cf11dd342',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_93_todas_feiras.png?alt=media&token=4b722d48-acfc-4c88-adc2-eacce4191538',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_94_todas_feiras.png?alt=media&token=ce9cedad-ae22-415e-ac75-6179b4aab562',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_95_feiras_flamengo_laranjeiras.png?alt=media&token=3a1ed573-4186-4df2-a6fa-592c44faa2f1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_96_todas_feiras.png?alt=media&token=3fa773a3-cd11-4d4f-b9e0-c524b44a005e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_97_feiras_flamengo_laranjeiras.png?alt=media&token=8be16d63-017f-49ce-8def-55435f3e9c10',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_98_feiras_flamengo_laranjeiras.png?alt=media&token=27500fce-19c1-4280-9b52-a9a59979feb6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_99_todas_feiras.png?alt=media&token=81393c97-beb6-49f6-a8d4-e56fa4e57d53',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_17_todas_feiras.png?alt=media&token=0fc68154-09ef-41d5-a270-119fcd5d2c27',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_19_feiras_flamengo_laranjeiras.png?alt=media&token=f4d8b975-1240-4a73-bd25-9aabdb6099e2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_23_feiras_flamengo_laranjeiras.png?alt=media&token=7f5df071-2da1-438f-a425-bbfe8464d0b1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_92_todas_feiras.png?alt=media&token=831f13a2-6713-4560-a409-bbd3587710c3',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_31_batatman.mp4?alt=media&token=553bcd2c-faee-4863-812f-ce99c0d432cf'
];

function getFairCategories(fileName: string): GalleryFair[] {
    const fairs: GalleryFair[] = [];
    const fairsMap: Record<string, GalleryFair> = {
        'todas_feiras': 'Todas',
        'feiras_flamengo_laranjeiras': 'Flamengo e Laranjeiras',
        'feira_grajau': 'Grajaú',
        'feira_tijuca': 'Tijuca',
        'feira_botafogo': 'Botafogo',
        'feira_leme': 'Leme',
    };
    for (const key in fairsMap) {
        if (fileName.includes(key)) {
            fairs.push(fairsMap[key]);
        }
    }
    return fairs;
}

function getThemeCategories(fileName: string): GalleryTheme[] {
    const themes: GalleryTheme[] = [];
    const themesMap: Record<string, GalleryTheme> = {
        'fot_': 'Fotografias',
        'aagr_': 'Agricultores - Animações e Cartoon',
        'aali_': 'Alimentos - Animações e Cartoon',
        'ap_': 'Personagens - Animações e Cartoon',
        'story': 'Story',
        'especial': 'Dias Especiais'
    };
    for (const key in themesMap) {
        if (fileName.includes(key)) {
            themes.push(themesMap[key]);
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
